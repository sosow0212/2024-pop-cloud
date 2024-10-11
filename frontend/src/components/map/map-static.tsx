import { Map as KakaoMap } from "react-kakao-maps-sdk";

import cn from "../ui/cn";
import MapMarker from "./map-marker";

interface MapStaticProps {
  position: MapPositionType;
  label: string;
  location: string;
  level?: number;
  className?: string;
}

export default function MapStatic({
  label,
  position,
  location,
  level = 4,
  className,
}: MapStaticProps) {
  return (
    <section className={cn("relative w-500 h-500", className)}>
      <KakaoMap
        level={level}
        style={{
          position: "absolute",
          inset: 0,
        }}
        center={position}
      >
        <MapMarker
          id={location}
          location={location}
          title={label}
          type="place"
          position={position}
          infoUrl=""
        />
      </KakaoMap>
    </section>
  );
}
