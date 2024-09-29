"use client";

import { useState } from "react";

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
      {mapInfo.markers?.map((marker) => (
        <MapMarker
          key={`${marker.position.lat}=${marker.position.lng}`}
          {...marker}
        />
      ))}
    </MapContainer>
  );
}
