import { useEffect, useMemo, useState } from "react";

const SEONGSU = {
  lat: 37.544882695287725,
  lng: 127.05574132618605,
};

const initState: MapInfoType = {
  currentPosition: SEONGSU,
  center: SEONGSU,
  markers: [
    {
      searchTarget: "POPUPS",
      id: 111,
      title: "타임스트림",
      position: {
        latitude: {
          value: 37.48388636094257,
        },
        longitude: {
          value: 126.93034045502553,
        },
        location: "주소 타임스트림",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
    {
      searchTarget: "POPUPS",
      id: 222,
      title: "강남수 요양병원",
      position: {
        latitude: {
          value: 37.4851550452392,
        },
        longitude: {
          value: 126.930450082986,
        },
        location: "주소 강남수요양병원",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
    {
      searchTarget: "EXHIBITION",
      id: 333,
      title: "미남장소",
      position: {
        latitude: {
          value: 37.4842340583771,
        },
        longitude: {
          value: 126.92719916344,
        },
        location: "주소 미남참치",
      },
      startDate: String(new Date()),
      endDate: String(new Date()),
      visitedCount: 10,
      likedCount: 20,
    },
  ],
  mapLevel: 4,
};

/**
 *
 * @author 위영진
 * 1. 초기 로드시 위치 접근 허용에 따른 사용자의 현재 위치값이 조정 됩니다. (위치 차단시 성수역으로 지정)
 * 2. 지도의 움직임 또는 레벨 변화를 감지하면 기존 중심으로부터 delta를 더하여 범위를 벗어났는지 체크 한 후 벗어났다면 새로운 마커를 서버로부터 받아옵니다.
 * 3. 키워드를 통해 지도의 중심 좌표를 변화시킬 수 있습니다. 변화됐다면 새로운 마커를 불러옵니다.
 * 4. delta - 서버로부터 새로운 값을 받아올지를 판별할 수 있는 범위값입니다.
 *         지도의 레벨에 따라 delta 또한 증가됩니다.
 *         지도의 레벨이 1 && 브라우저 뷰 1470*860 기준으로 동-서,북-남을 계산한 뒤 이것의 각각의 두배의 값을 delta의 lat과 lng로 잡았습니다.
 *         지도의 레벨이 한 단계씩 오를 때마다 두배가 되어 이를 계산에 참고하였고 리렌더링 될 때마다 계산하는 것을 방지하기 위해 useMemo로 잡았습니다.
 * @returns {
 *     mapInfo: {
 *        유저의 현재 위치, 지도의 중심 좌표, 지도의 레벨, 지도 마커 정보
 *     },
 *     detectMoving: func-지도 움직임과 레벨 변화를 감지,
 *     changeCenterPosition: func-검색창에서 위치 클릭시 지도의 중심과 현재 위치 변화,
 *     loading: 지도 페이지 초기 로드시 스켈레톤을 위한 값,
 * }
 * @TODO detectMoving() -> judgeInRange() 실행 후 조건문 충족 시 action함수 실행
 * @TODO 검색 창에서 위치 클릭 후 changeCenterPosition() 발동 됐다면 action 함수 실행
 */

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);
  const [loading, setLoading] = useState(true);
  const delta = useMemo(
    () => ({
      lat: 0.0017985216362035317 * 2 ** mapInfo.mapLevel,
      lng: 0.003461695223506922 * 2 ** mapInfo.mapLevel,
    }),
    [mapInfo.mapLevel],
  );

  const changeCenterPosition = (
    lat: number,
    lng: number,
    withCurrent: boolean,
  ) => {
    if (withCurrent) {
      setMapInfo((p) => ({
        ...p,
        center: {
          lat,
          lng,
        },
        currentPosition: {
          lat,
          lng,
        },
      }));
    } else {
      setMapInfo((p) => ({
        ...p,
        center: {
          lat,
          lng,
        },
        mapLevel: 4,
      }));
    }
  };

  const judgeInRange = (map: kakao.maps.Map) => {
    const { lat, lng } = mapInfo.center;
    const mapCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };

    const bounds = map.getBounds();
    const north = bounds.getNorthEast().getLat();
    const east = bounds.getNorthEast().getLng();
    const south = bounds.getSouthWest().getLat();
    const west = bounds.getSouthWest().getLng();
    if (
      lat + delta.lat <= north ||
      lat - delta.lat >= south ||
      lng + delta.lng <= east ||
      lng - delta.lng >= west
    ) {
      setMapInfo((p) => ({
        ...p,
        center: mapCenter,
      }));
    }
  };

  const detectMoving = (map: kakao.maps.Map) => {
    const level = map.getLevel();
    if (level !== mapInfo.mapLevel) {
      setMapInfo((p) => ({
        ...p,
        mapLevel: level,
      }));
    }
    judgeInRange(map);
  };

  useEffect(() => {
    const getSuccessGeo = (p: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = p.coords;
      setMapInfo((previousMapInfo) => ({
        ...previousMapInfo,
        center: {
          lat,
          lng,
        },
        currentPosition: {
          lat,
          lng,
        },
      }));
      setLoading(false);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getSuccessGeo, () =>
        setLoading(false),
      );
    } else {
      setLoading(false);
    }
  }, []);

  return {
    mapInfo,
    detectMoving,
    changeCenterPosition,
    loading,
  };
};
export default useMapState;
