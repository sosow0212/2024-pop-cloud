import { useRef } from "react";
import { Map as KakaoMap } from "react-kakao-maps-sdk";

import cn from "../ui/cn";
import MapMarker from "./map-marker";

interface MapContainerProps {
  level: number;
  center: MapPositionType;
  className?: string;
  children?: React.ReactNode;
  handleChange: (map: kakao.maps.Map) => void;
}

export default function MapContainer({
  center,
  className,
  children,
  level,
  handleChange,
}: MapContainerProps) {
  const mapRef = useRef<kakao.maps.Map>(null);

  return (
    <section className={cn("relative w-500 h-500", className)}>
      <KakaoMap
        level={level}
        ref={mapRef}
        style={{
          position: "absolute",
          inset: 0,
        }}
        center={center}
        onCenterChanged={handleChange}
        minLevel={13}
      >
        <MapMarker
          title="현재 위치"
          type="current"
          position={center}
          infoUrl=""
        />
        {children}
      </KakaoMap>
    </section>
  );
}
