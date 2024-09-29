import { MapMarker as KaKaoMapMarker } from "react-kakao-maps-sdk";

const MarkerImageSrc = {
  current: "./images/map/current-marker.png",
  bookmark: "./images/map/bookmark-marker.png",
  place: "./images/map/place-marker.png",
};

export default function MapMarker({ position, title, type }: MarkerType) {
  return (
    <KaKaoMapMarker
      position={position}
      image={{
        src: MarkerImageSrc[type],
        size: {
          width: 24,
          height: 35,
        },
      }}
      title={title}
    />
  );
}
