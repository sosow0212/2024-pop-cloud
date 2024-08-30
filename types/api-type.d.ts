// pop up
type IPopupDetailInfo = {
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
  publicTag: IPublicTag;
};

type IPopupFormData = {
  title: string;
  description: string;
  location: string; //주소
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
  tags: string[];
};

type IPopupListResponse = {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
};

// exhibition

type IExhibitionDetailInfo = {
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
};

type IExhibitionFormData = {
  title: string;
  description: string;
  location: string; //주소
  isParkingAvailable: boolean;
  fee: number;
  startDate: Date;
  endDate: Date;
  openTimes: string;
  latitude: number;
  longitude: number;
  publicTag: string;
  tags: string[];
};

type IExhibitionListResponse = {
  id: string;
  title: string;
  location: string;
  startDate: Date;
  endDate: Date;
};
