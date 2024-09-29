type MapPositionType = {
  lat: number;
  lng: number;
};

type MarkerType = {
  position: MapPositionType;
  title: string;
  type: "current" | "bookmark" | "place";
  infoUrl: string;
};

type MapInfoType = {
  center: MapPositionType;
  markers?: MarkerType[];
};
