"use client";

import { IPosition, Map, MapLoading } from "@/components/map";

import { useEffect, useState } from "react";
import { useGeolocation } from "@/hooks";

const MapsMap = () => {
  const { centerPosition, setCenterPosition, loading } = useGeolocation();
  const [mapLevel, setMapLevel] = useState<number>(3);
  const [markers, setMarkers] = useState<IPosition[]>();
  const [bound, setBound] = useState<kakao.maps.LatLngBounds>();

  const onChangeLevel = (map: kakao.maps.Map) => {
    setMapLevel(map.getLevel());
    setBound(map.getBounds());
  };

  useEffect(() => {
    console.group("asd");
    console.log(bound?.getNorthEast());
    console.log(bound?.getSouthWest());
  }, [bound]);

  if (loading || centerPosition === undefined) return <MapLoading />;

  return (
    <div className="flex flex-col gap-y-2">
      <h4>현재 위치 근방 핫플</h4>
      <Map
        center={centerPosition}
        markers={[centerPosition]}
        onChangeLevel={onChangeLevel}
      />
    </div>
  );
};

export default MapsMap;
