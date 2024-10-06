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

const DELTA = 0.02;

const distance = (x1: number, y1: number, x2: number, y2: number) =>
  (x2 - x1) ** 2 + (y2 - y1) ** 2;

const useMapState = () => {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);

  const detectMoving = (map: kakao.maps.Map) => {
    const currentCenter = {
      lat: map.getCenter().getLat(),
      lng: map.getCenter().getLng(),
    };
    const { lat, lng } = mapInfo.center;
    const isInRange =
      distance(lat, lng, currentCenter.lat, currentCenter.lng) <= DELTA ** 2;
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
        ...currentCenter,
      },
    }));
  };

  // useEffect(() => {
  //   const getPlace = async (): Promise<MapInfoType[] | undefined> => {
  //     try {
  //       const res = await fetch("./새로운 장소 받아오기");
  //       if (!res.ok) throw new Error("서버 에러");
  //       const data: MapInfoType[] = await res.json();
  //       return data;
  //     } catch (error) {}
  //   };
  //   getPlace();
  // }, [mapInfo.center]);

  return {
    mapInfo,
    detectMoving,
  };
};
export default useMapState;
