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
  mapLevel: 3,
};

// const getNewPlaces = async (): Promise<MarkerType[] | null> => {
//   const res = await fetch(`/maps/recommendation-location`);
//   if (res.ok) {
//     const data: MapResponseType[] = await res.json();
//   }
//   return null;
// };

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);
  const [loading, setLoading] = useState(true);
  const delta = useMemo(
    () => ({
      lat: 0.0011246652784322464 * 2 ** mapInfo.mapLevel,
      lng: 0.003353123718198958 * 2 ** mapInfo.mapLevel,
    }),
    [mapInfo.mapLevel],
  );

  const changeCenterPosition = (lat: number, lng: number) => {
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
