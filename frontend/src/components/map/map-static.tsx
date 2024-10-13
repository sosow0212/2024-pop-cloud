import { Map as KakaoMap } from "react-kakao-maps-sdk";

import cn from "../ui/cn";
import MapMarker from "./map-marker";

interface MapStaticProps {
  lat: number;
  lng: number;
  label: string;
  type: "popups" | "exhibition";
  level?: number;
  className?: string;
}

export default function MapStatic({
  label,
  lat,
  lng,
  level = 4,
  className,
  type,
}: MapStaticProps) {
  return (
    <section className={cn("relative w-500 h-500", className)}>
      <KakaoMap
        level={level}
        style={{
          position: "absolute",
          inset: 0,
        }}
        center={{
          lat,
          lng,
        }}
      >
        <MapMarker
          id={lat + lng}
          title={label}
          type={type}
          lat={lat}
          lng={lng}
        />
      </KakaoMap>
    </section>
  );
}
