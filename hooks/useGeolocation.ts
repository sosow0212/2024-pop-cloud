import { IPosition } from "@/components/map";
import { useEffect, useState } from "react";

const useGeolocation = () => {
  const [loading, setLoading] = useState(true);

  const [centerPosition, setCenterPosition] = useState<IPosition>();
  useEffect(() => {
    // 지도 동의시 현재 위치 추출ㄴ
    const getSuccessGeo = (p: GeolocationPosition) => {
      const { latitude, longitude } = p.coords;
      setCenterPosition({
        lat: latitude,
        lng: longitude,
      });
    };
    // 지도 미동의시에는 성수역을 기준으로 센터 잡음
    const getFailGeo = (e: GeolocationPositionError) => {
      setCenterPosition({
        lat: 37.544882695287725,
        lng: 127.05574132618605,
      });
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getSuccessGeo, getFailGeo);
    } else {
      console.log("해당 브러우저에서는 위치 정보를 받을 수 없습니다.");
    }
    setLoading(false);
  }, []);
  return { centerPosition, setCenterPosition, loading };
};

export default useGeolocation;
