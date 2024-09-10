/**
Map      https://apis.map.kakao.com/web/guide/
library  https://react-kakao-maps-sdk.jaeseokim.dev/
types    https://github.com/JaeSeoKim/kakao.maps.d.ts 
 */

import { Map as KakaoMap } from "react-kakao-maps-sdk";
import MapMarker from "./map-marker";
import { IPosition } from ".";
import { cn } from "zero-cnn";
import { Suspense, useEffect, useRef, useState } from "react";

interface MapProps {
  center: IPosition;
  markers?: IPosition[];
  className?: string;
  onChangeLevel: (map: kakao.maps.Map) => void;
}

const Spinner = () => {
  return (
    <div className="flex h-full w-full items-center justify-center bg-white">
      <div className="size-32 rounded-full bg-red-300" />
    </div>
  );
};

const Map = ({ center, markers, className, onChangeLevel }: MapProps) => {
  return (
    <Suspense fallback={<Spinner />}>
      <KakaoMap
        className={cn("h-[500px] w-full", className)}
        center={{ lat: center.lat, lng: center.lng }}
        onZoomChanged={onChangeLevel}
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
