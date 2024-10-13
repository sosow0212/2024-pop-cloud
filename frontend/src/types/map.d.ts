type MapPositionType = {
  lat: number;
  lng: number;
};

// type MarkerType = {
//   searchTarget?: "POPUPS" | "EXHIBITION";
//   id: number;
//   title: string;
//   position: MapPositionType;
//   location: string;
//   type: "current" | "popups" | "exhibition";
//   startDate?: Date;
//   endDate?: Date;
// };

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
  startDate: Date;
  endDate: Date;
  visitedCount: number;
  likedCount: number;
};

type MapInfoType = {
  currentPosition: MapPositionType;
  center: MapPositionType;
  markers: MarkerType[];
  mapLevel: number;
};

// type MapResponseType = {
//   searchTarget: "POPUPS" | "EXHIBITION";
//   id: number;
//   title: string;
//   position: {
//     location: string;
//     latitude: {
//       value: number;
//     };
//     longitude: {
//       value: number;
//     };
//   };
//   startDate: Date;
//   endDate: Date;
//   visitedCount: number;
//   likedCount: number;
// };
