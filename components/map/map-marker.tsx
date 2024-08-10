import { MapMarker as KakaoMapMarker } from "react-kakao-maps-sdk";
import { IPosition } from ".";

interface MapMarkerProps {
  position: IPosition;
}

const MapMarker = ({ position }: MapMarkerProps) => {
  return (
    <KakaoMapMarker position={{ lat: position.lat, lng: position.lng }}>
      <div style={{ color: "#000" }}>Hello World!</div>
    </KakaoMapMarker>
  );
};

export default MapMarker;
