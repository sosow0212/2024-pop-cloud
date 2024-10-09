"use client";

/**
 * @TODO 지도의 레벨 또는 중심 좌표 변화 시 state값이 변화 됩니다. 변화 감지시 서버로부터 해당 바운더리 안에 있는 장소들을 받아오도록 작성해야합니다.
 * marker는 현재 위치, 북마크인 장소인지, 장소로 나눠져 해당하는 이미지와 라벨이 지도에 표시됩니다.
 */

import { MarkerClusterer } from "react-kakao-maps-sdk";

import MapContainer from "./map-container";
import MapMarker from "./map-marker";

interface MapProps {
  mapInfo: MapInfoType;
  className?: string;
  handleChange: (map: kakao.maps.Map) => void;
}

export default function Map({ mapInfo, className, handleChange }: MapProps) {
  return (
    <MapContainer
      mapInfo={mapInfo}
      className={className}
      handleChange={handleChange}
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
