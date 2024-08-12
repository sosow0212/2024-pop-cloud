"use client";

import { IPosition, Map } from "@/components/map";
import { Suspense, useEffect, useState } from "react";

const MainMap = () => {
  // 초기 성수역 기준으로 잡음
  const [centerPosition, setCenterPosition] = useState<IPosition>({
    lat: 37.544882695287725,
    lng: 127.05574132618605,
  });
  useEffect(() => {
    const getSuccessGeo = (p: GeolocationPosition) => {
      const { latitude, longitude } = p.coords;
      setCenterPosition({
        lat: latitude,
        lng: longitude,
      });
    };
    const getFailGeo = (e: GeolocationPositionError) => {
      console.log(e.message);
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getSuccessGeo, getFailGeo, {});
    } else {
      console.log("해당 브러우저에서는 위치 정보를 받을 수 없습니다.");
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-2">
      <div>현재 위치 근방 핫플</div>
      <Map
        className="h-[500px]"
        center={centerPosition}
        markers={[centerPosition]}
      />
    </div>
  );
};

export default MainMap;
