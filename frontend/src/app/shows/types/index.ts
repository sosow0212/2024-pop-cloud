export interface FilterAccordionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export interface CheckboxListProps {
  items: readonly string[];
  selectedItems: string[];
  onChange: (selectedItems: string[]) => void;
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
  showType: "POPUPS" | "EXHIBITION";
  visitedCount: number;
  likedCount: number;
}
