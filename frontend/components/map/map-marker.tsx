import { MapMarker as KakaoMapMarker } from "react-kakao-maps-sdk";
import { IPosition } from ".";

interface MapMarkerProps {
  position: IPosition;
  center?: boolean;
}

// 마커 배경색 이슈로 수정해야함

const MapMarker = ({ position }: MapMarkerProps) => {
  return (
    <KakaoMapMarker
      position={{ lat: position.lat, lng: position.lng }}
      image={{
        src: "/icons/marker2.svg",
        size: {
          width: 30,
          height: 30,
        },
      }}
    >
      {/* <div style={{ color: "#000" }}>Hello World!</div> */}
    </KakaoMapMarker>
  );
};

export default MapMarker;
