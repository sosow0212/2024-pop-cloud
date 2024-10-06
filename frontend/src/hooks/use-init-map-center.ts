import { useEffect } from "react";

type SetMapInfoFunction = React.Dispatch<React.SetStateAction<MapInfoType>>;

const useInitMapCenter = (setMapInfo: SetMapInfoFunction) => {
  useEffect(() => {
    const getSuccessGeo = (p: GeolocationPosition) => {
      const { latitude: lat, longitude: lng } = p.coords;
      setMapInfo((previousMapInfo) => ({
        ...previousMapInfo,
        center: {
          lat,
          lng,
        },
      }));
    };

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(getSuccessGeo);
    }
  }, [setMapInfo]);
};

export default useInitMapCenter;
