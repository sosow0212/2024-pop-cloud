/**
Map      https://apis.map.kakao.com/web/guide/
library  https://react-kakao-maps-sdk.jaeseokim.dev/
types    https://github.com/JaeSeoKim/kakao.maps.d.ts 
 */

import { Map as KakaoMap } from "react-kakao-maps-sdk";
import MapMarker from "./map-marker";
import { IPosition } from ".";

interface MapProps {
  center: IPosition;
  markers?: IPosition[];
}

const Map = ({ center, markers }: MapProps) => {
  return (
    <KakaoMap
      center={{ lat: center.lat, lng: center.lng }}
      style={{ width: "50%", height: "360px" }}
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
  );
};

export default Map;
