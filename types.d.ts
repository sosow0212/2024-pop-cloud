interface IPopupInfo {
  id: string;
  ownerId: string;
  title: string;
  description: string;
  location: string;
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
}
