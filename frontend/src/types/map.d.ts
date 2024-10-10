type MapPositionType = {
  lat: number;
  lng: number;
};

type MarkerType = {
  id: string;
  title: string;
  position: MapPositionType;
  location: string;
  title: string;
  type: "current" | "bookmark" | "place";
  infoUrl?: string;
  startDate?: Date;
  endDate?: Date;
};

type MapInfoType = {
  currentPosition: MapPositionType;
  center: MapPositionType;
  markers: MarkerType[];
  mapLevel: number;
};
