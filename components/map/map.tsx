/**
Map      https://apis.map.kakao.com/web/guide/
library  https://react-kakao-maps-sdk.jaeseokim.dev/
types    https://github.com/JaeSeoKim/kakao.maps.d.ts 
 */

import { Map as KakaoMap } from "react-kakao-maps-sdk";
import MapMarker from "./map-marker";
import { IPosition } from ".";
import { cn } from "zero-cnn";
import { Suspense } from "react";

interface MapProps {
  center: IPosition;
  markers?: IPosition[];
  className?: string;
}

const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="size-32 rounded-full bg-red-300" />
    </div>
  );
};

const Map = ({ center, markers, className }: MapProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <KakaoMap
        className={cn("h-52 w-full", className)}
        center={{ lat: center.lat, lng: center.lng }}
      >
        {markers?.map((marker) => (
          <MapMarker
            key={`${marker.lat}-${marker.lng}`}
            position={{
              lat: marker.lat,
              lng: marker.lng,
            }}
          />
        ))}
      </KakaoMap>
    </Suspense>
  );
};

export default Map;
