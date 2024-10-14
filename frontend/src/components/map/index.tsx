"use client";

/**
 * @TODO 지도의 레벨 또는 중심 좌표 변화 시 state값이 변화 됩니다. 변화 감지시 서버로부터 해당 바운더리 안에 있는 장소들을 받아오도록 작성해야합니다.
 * marker는 현재 위치, 북마크인 장소인지, 장소로 나눠져 해당하는 이미지와 라벨이 지도에 표시됩니다.
 */

import { MarkerClusterer } from "react-kakao-maps-sdk";

import MapContainer from "./map-container";
import MapMarker from "./map-marker";

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
      <MarkerClusterer averageCenter minLevel={7}>
        {mapInfo.markers?.map((marker) => (
          <MapMarker
            key={marker.id}
            id={marker.id}
            lat={marker.position.latitude.value}
            lng={marker.position.longitude.value}
            title={marker.title}
            type={marker.searchTarget.toLowerCase() as "popups" | "exhibition"}
            clickedMarker={clickedMarker}
            onClickMarker={onClickMarker}
            location={marker.position.location}
            startDate={marker.startDate}
            endDate={marker.endDate}
          />
        ))}
      </MarkerClusterer>
    </MapContainer>
  );
}
