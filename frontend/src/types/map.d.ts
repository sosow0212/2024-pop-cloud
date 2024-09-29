type MapPositionType = {
  lat: number;
  lng: number;
};

type MarkerType = {
  position: MapPositionType;
  title: string;
  type: "current" | "bookmark" | "place";
};

type MapInfoType = {
  center: MapPositionType;
  markers?: MarkerType[];
};
