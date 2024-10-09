// import { useState } from "react";
import {
  CustomOverlayMap,
  MapMarker as KaKaoMapMarker,
} from "react-kakao-maps-sdk";

import cn from "../ui/cn";

const MarkerImageSrc = {
  current: "./images/map/current-marker.png",
  bookmark: "./images/map/bookmark-marker.png",
  place: "./images/map/place-marker.png",
};

export default function MapMarker({
  position,
  title,
  type,
  infoUrl,
}: MarkerType) {
  return (
    <div className="group">
      <KaKaoMapMarker
        // onMouseOver={}
        position={position}
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
            }, // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.
          },
        }}
      />
      <CustomOverlayMap position={position} yAnchor={1}>
        <div
          className={cn(
            "text-xs max-w-160 -translate-y-40 translate-x-12 truncate rounded-md  px-8 py-4 text-white  group-hover:text-blue-400",
            type === "current" && "bg-black",
            type === "bookmark" && "bg-yellow-500",
            type === "place" && "bg-blue-500",
          )}
        >
          <a href={infoUrl} target="_blank" rel="noreferrer">
            <span>{title}</span>
          </a>
        </div>
      </CustomOverlayMap>
    </div>
  );
}
