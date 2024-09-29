"use client";

import { useState } from "react";

import { useInitMapCenter } from "@/hooks";

import MapContainer from "./map-container";
import MapMarker from "./map-marker";

const initState: MapInfoType = {
  center: {
    lat: 37.544882695287725,
    lng: 127.05574132618605,
  },
  markers: [],
};

export default function Map() {
  const [mapInfo, setMapInfo] = useState<MapInfoType>(initState);
  useInitMapCenter(setMapInfo);

  return (
    <MapContainer center={mapInfo.center}>
      {mapInfo.markers?.map((marker) => (
        <MapMarker
          key={`${marker.position.lat}=${marker.position.lng}`}
          {...marker}
        />
      ))}
    </MapContainer>
  );
}
