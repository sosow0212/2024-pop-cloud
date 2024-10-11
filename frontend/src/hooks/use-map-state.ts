import { useEffect, useMemo, useState } from "react";

const SEONGSU = {
  lat: 37.544882695287725,
  lng: 127.05574132618605,
};

const initState: MapInfoType = {
  currentPosition: SEONGSU,
  center: SEONGSU,
  markers: [],
  mapLevel: 4,
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

  const changeCenterPosition = (lat: number, lng: number) => {
    setMapInfo((p) => ({
      ...p,
      center: {
        lat,
        lng,
      },
    }));
  };

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

  return {
    mapInfo,
    detectMoving,
    changeCenterPosition,
  };
};
export default useMapState;
