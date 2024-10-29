"use client";

import Image from "next/image";
import { useState } from "react";
import { CustomOverlayMap } from "react-kakao-maps-sdk";

import { formatDate } from "../common/list-card";
import cn from "../ui/cn";

const MarkerImageSrc = {
  current: "/images/map/current-marker.png",
  popups: "/images/map/popups-marker.png",
  exhibition: "/images/map/exhibition-marker.png",
};

const bgVarinant = {
  current: "bg-black",
  exhibition: "bg-yellow-500",
  popups: "bg-blue-500",
};

interface MapMarkerProps {
  isStaticMap?: boolean;
  type: "current" | "popups" | "exhibition";
  title?: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  lat: number;
  lng: number;
  id: number;
  clickedMarker?: number;
  onClickMarker?: (markerId: number) => void;
}

export default function MapMarker({
  id,
  lat,
  lng,
  title,
  type,
  location,
  startDate,
  endDate,
  isStaticMap,
  clickedMarker,
  onClickMarker,
}: MapMarkerProps) {
  const [isHover, setIsHover] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => {
        if (onClickMarker) onClickMarker(id);
      }}
    >
      <CustomOverlayMap
        position={{
          lat,
          lng,
        }}
        xAnchor={0.15}
      >
        <Image width={20} height={20} alt="marker" src={MarkerImageSrc[type]} />
        <div
          className={cn(
            "text-xs -translate-x-[calc(50%-10)] transition-all truncate rounded-md  px-8 py-4 text-white",
            bgVarinant[type],
            isHover || id === clickedMarker
              ? "size-full opacity-100"
              : "size-0 opacity-0",
            isStaticMap && "opacity-100 size-full",
          )}
        >
          <div>{title}</div>
          {id === clickedMarker && (
            <div className="text-black">
              <div className="text-14">{location}</div>
              <div className="mt-2 text-right text-12">
                {startDate && (
                  <time dateTime={startDate}>{formatDate(startDate)}</time>
                )}
                {" - "}
                {endDate && (
                  <time dateTime={endDate}>{formatDate(endDate)}</time>
                )}
              </div>
            </div>
          )}
        </div>
      </CustomOverlayMap>
    </button>
  );
}
