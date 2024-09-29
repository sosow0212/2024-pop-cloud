"use client";

import { useState } from "react";
import { MarkerClusterer } from "react-kakao-maps-sdk";

import { useInitMapCenter } from "@/hooks";

import MapContainer from "./map-container";
import MapMarker from "./map-marker";

interface MapProps {
  className?: string;
}

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

export default function Map({ className }: MapProps) {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);
  useInitMapCenter(setMapInfo);

  const handleChagnge = (map: kakao.maps.Map) => {
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

  // useEffect(() => {
  // mapInfo의 레빌과 바운드 변화를 감지하여 marker를 서버로부터 받아옴
  // 정적 지도일 경우 노노
  // }, [mapInfo]);

  return (
    <MapContainer
      level={mapInfo.mapLevel}
      center={mapInfo.center}
      className={className}
      handleChange={handleChagnge}
    >
      <MarkerClusterer averageCenter minLevel={10}>
        {mapInfo.markers?.map((marker) => (
          <MapMarker
            key={`${marker.position.lat}=${marker.position.lng}`}
            {...marker}
          />
        ))}
      </MarkerClusterer>
    </MapContainer>
  );
}
