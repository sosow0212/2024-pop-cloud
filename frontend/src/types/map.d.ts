type MapPositionType = {
  lat: number;
  lng: number;
};

type MarkerType = {
  searchTarget: "POPUPS" | "EXHIBITION";
  id: number;
  title: string;
  position: {
    location: string;
    latitude: {
      value: number;
    };
    longitude: {
      value: number;
    };
  };
  startDate: string;
  endDate: string;
  visitedCount: number;
  likedCount: number;
};

type MapInfoType = {
  currentPosition: MapPositionType;
  center: MapPositionType;
  markers: MarkerType[];
  mapLevel: number;
};
