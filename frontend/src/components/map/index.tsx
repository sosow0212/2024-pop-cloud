"use client";

/**
 * @TODO 지도의 레벨 또는 중심 좌표 변화 시 state값이 변화 됩니다. 변화 감지시 서버로부터 해당 바운더리 안에 있는 장소들을 받아오도록 작성해야합니다.
 * marker는 현재 위치, 북마크인 장소인지, 장소로 나눠져 해당하는 이미지와 라벨이 지도에 표시됩니다.
 */

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
