"use client";

import { MarkerClusterer } from "react-kakao-maps-sdk";

import MapContainer from "./map-container";
import MapMarker from "./map-marker";

/**
 * @author 위영진
 */

interface MapProps {
  className?: string;
  mapInfo: MapInfoType;
  clickedMarker: number;
  onClickMarker: (markerId: number) => void;
  handleChange: (map: kakao.maps.Map) => void;
}

export default function Map({
  mapInfo,
  className,
  handleChange,
  clickedMarker,
  onClickMarker,
}: MapProps) {
  return (
    <MapContainer
      mapInfo={mapInfo}
      className={className}
      handleChange={handleChange}
    >
      <MarkerClusterer averageCenter minLevel={8}>
        {mapInfo.markers?.map((marker) => (
          <MapMarker
            key={marker.id}
            lat={marker.position.latitude.value}
            lng={marker.position.longitude.value}
            location={marker.position.location}
            type={marker.searchTarget.toLowerCase() as "popups" | "exhibition"}
            id={marker.id}
            title={marker.title}
            clickedMarker={clickedMarker}
            onClickMarker={onClickMarker}
            startDate={marker.startDate}
            endDate={marker.endDate}
          />
        ))}
      </MarkerClusterer>
    </MapContainer>
  );
}
