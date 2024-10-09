import { useEffect, useState } from "react";

const SEONGSU = {
  lat: 37.544882695287725,
  lng: 127.05574132618605,
};

const initState: MapInfoType = {
  currentPosition: SEONGSU,
  center: SEONGSU,
  markers: [],
  mapLevel: 4,
  bound: {
    north: 0,
    east: 0,
    south: 0,
    west: 0,
  },
};

const DELTA = 0.02;

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  (x2 - x1) ** 2 + (y2 - y1) ** 2;

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);

  const detectMoving = (map: kakao.maps.Map) => {
    const mapCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    const { lat, lng } = mapInfo.center;
    const isInRange =
      distance(lat, lng, mapCenter.lat, mapCenter.lng) <= DELTA ** 2;
    if (isInRange) return;

    const level = map.getLevel();
    const bounds = map.getBounds();
    const north = bounds.getNorthEast().getLat();
    const east = bounds.getNorthEast().getLng();
    const south = bounds.getSouthWest().getLat();
    const west = bounds.getSouthWest().getLng();

    setMapInfo((p) => ({
      ...p,
      mapLevel: level,
      bound: {
        north,
        east,
        south,
        west,
      },
      center: {
        ...mapCenter,
      },
    }));
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
  };
};
export default useMapState;
