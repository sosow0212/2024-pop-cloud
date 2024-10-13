import Link from "next/link";
import {
  CustomOverlayMap,
  MapMarker as KaKaoMapMarker,
} from "react-kakao-maps-sdk";

import cn from "../ui/cn";

const MarkerImageSrc = {
  current: "./images/map/current-marker.png",
  popups: "./images/map/popups-marker.png",
  exhibition: "./images/map/exhibition-marker.png",
};

// interface MapMarkerProps extends MarkerType {
//   isRecommendation?: boolean;
// }

interface MapMarkerProps {
  type: "current" | "popups" | "exhibition";
  title: string;
  lat: number;
  lng: number;
  id: number;
}

export default function MapMarker({
  id,
  lat,
  lng,
  title,
  type,
}: MapMarkerProps) {
  return (
    <>
      <KaKaoMapMarker
        position={{
          lat,
          lng,
        }}
        image={{
          src: MarkerImageSrc[type],
          size: {
            width: 24,
            height: 35,
          },
          options: {
            offset: {
              x: 0,
              y: 35,
            },
          },
        }}
      />
      <CustomOverlayMap
        position={{
          lat,
          lng,
        }}
        yAnchor={1}
      >
        <div
          className={cn(
            "text-xs max-w-160 -translate-y-40 translate-x-12 truncate rounded-md  px-8 py-4 text-white ",
            type === "current" && "bg-black",
            type === "exhibition" && "bg-yellow-500",
            type === "popups" && "bg-blue-500",
          )}
        >
          <Link href={`/${type}/${id}`}>
            <span>{title}</span>
          </Link>
        </div>
      </CustomOverlayMap>
    </>
  );
}
