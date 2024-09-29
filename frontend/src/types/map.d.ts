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
type BoundType = {
  north: number;
  east: number;
  south: number;
  west: number;
};

type MapInfoType = {
  center: MapPositionType;
  markers?: MarkerType[];
  mapLevel: number;
  bound: BoundType;
};
