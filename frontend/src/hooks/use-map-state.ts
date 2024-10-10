import { useEffect, useMemo, useState } from "react";

const SEONGSU = {
  lat: 37.544882695287725,
  lng: 127.05574132618605,
};

const initState: MapInfoType = {
  currentPosition: SEONGSU,
  center: SEONGSU,
  markers: [],
  mapLevel: 1,
};

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);

  const delta = useMemo(
    () => ({
      lat: 0.0011246652784322464 * 2 ** mapInfo.mapLevel,
      lng: 0.003353123718198958 * 2 ** mapInfo.mapLevel,
    }),
    [mapInfo.mapLevel],
  );
  const detectMoving = (map: kakao.maps.Map) => {
    const mapCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    const { lat, lng } = mapInfo.center;

    const level = map.getLevel();
    if (level !== mapInfo.mapLevel) {
      setMapInfo((p) => ({
        ...p,
        mapLevel: level,
      }));
    }

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
      // 새로운 데이터 받아오기
      // console.log("플레이스 새로 받아오기");
      setMapInfo((p) => ({
        ...p,
        center: mapCenter,
      }));
    }
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
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getSuccessGeo);
    }
  }, []);

  useEffect(() => {
    // console.log(mapInfo);
  }, [mapInfo]);
  return {
    mapInfo,
    detectMoving,
  };
};
export default useMapState;

// 안녕하세요. 첨부된 사진에 나와 있는 부분을 구현중에 의견을 여쭙고자 메시지를 남깁니다!
//  현재 delta를 잡는 부분을 지도 레벨에 따라 useMemo로 잡아주고 있는데 이러한 로직이 괜찮은지 피드백 부탁드립니다.

// const delta = useMemo(
//     () => ({
//       lat: 0.0005636698552464736 * 2 ** (mapInfo.mapLevel - 1) * 2 * 2,
//       lng: 0.0016742085530569994 * 2 ** (mapInfo.mapLevel - 1) * 2 * 2,
//     }),
//     [mapInfo.mapLevel],
//   );

// lat과 lng는 지도가 레벨 1일 때 웹 페에지 화면에 보여지는 지도의 (북쪽 - 남쪽) 값과 (동쪽-서쪽)의 값입니다. (피시 화면이나 모바일 화면에서 큰 차이가 없어서 저렇게 상수로 뒀습니다)
// 지도 레벨이 하나씩 높아질수록 높이와 폭이 2배씩 증가되어 delta 값을
