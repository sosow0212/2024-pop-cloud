import { useRef } from "react";
import { Map as KakaoMap } from "react-kakao-maps-sdk";

import cn from "../ui/cn";
import MapMarker from "./map-marker";

interface MapContainerProps {
  mapInfo: MapInfoType;
  className?: string;
  children?: React.ReactNode;
  handleChange: (map: kakao.maps.Map) => void;
}

export default function MapContainer({
  mapInfo,
  className,
  children,
  handleChange,
}: MapContainerProps) {
  const mapRef = useRef<kakao.maps.Map>(null);
  return (
    <section className={cn("relative w-500 h-500", className)}>
      <KakaoMap
        level={mapInfo.mapLevel}
        ref={mapRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
        center={mapInfo.center}
        onCenterChanged={handleChange}
        minLevel={13}
      >
        <MapMarker
          type="current"
          lat={mapInfo.currentPosition.lat}
          lng={mapInfo.currentPosition.lng}
          id={1010101010}
        />
        {children}
      </KakaoMap>
    </section>
  );
}
