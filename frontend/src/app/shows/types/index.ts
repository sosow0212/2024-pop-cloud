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
