declare module "@pop-cloud-types" {
  export interface Show {
    id: number;
    ownerId: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    openTimes: string;
    location: string;
    latitude: number;
    longitude: number;
    isParkingAvailable: boolean;
    isFoodAllowed: boolean;
    isPetAllowed: boolean;
    isKidsZone: boolean;
    isWifiAvailable: boolean;
    fee: number;
    publicTag: string;
    visitCount: number;
    likedCount: number;
    tags: string[];
    images: string[];
  }
}
