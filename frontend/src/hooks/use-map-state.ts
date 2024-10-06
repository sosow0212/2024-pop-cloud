import { useState } from "react";

const initState: MapInfoType = {
  center: {
    lat: 37.544882695287725,
    lng: 127.05574132618605,
  },
  markers: [],
  mapLevel: 4,
  bound: {
    north: 0,
    east: 0,
    south: 0,
    west: 0,
  },
};

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);

  const detectMoving = (map: kakao.maps.Map) => {
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
    }));
  };
  return {
    mapInfo,
    detectMoving,
  };
};
export default useMapState;
