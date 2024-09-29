import { Map as KakaoMap } from "react-kakao-maps-sdk";

import cn from "../ui/cn";
import MapMarker from "./map-marker";

interface MapContainerProps {
  className?: string;
  children?: React.ReactNode;
  center: MapPositionType;
}

export default function MapContainer({
  center,
  className,
  children,
}: MapContainerProps) {
  return (
    <section className={cn("relative w-500 h-500", className)}>
      <KakaoMap
        style={{
          position: "absolute",
          inset: 0,
        }}
        center={center}
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
