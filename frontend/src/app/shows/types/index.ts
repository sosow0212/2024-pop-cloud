export interface FilterAccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export interface CheckboxListProps {
  items: readonly string[];
}

export interface RegionType {
  [key: string]: string[];
}

export interface ShowData {
  showId: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  images: string[];
  publicTag: string;
  showType: string;
  visitedCount: number;
  likedCount: number;
}
