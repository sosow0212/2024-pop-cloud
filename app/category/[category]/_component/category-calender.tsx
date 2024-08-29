import { Calendar } from "@/components/ui/calendar";

import { cn } from "zero-cnn";

interface CategoryCalendarProps {
  className: string;
  isOpen: boolean;
  // handleSelect: (start: Date, end: Date) => void;
}
export function CategoryCalendar({
  className,
  // handleSelect,
  isOpen,
}: CategoryCalendarProps) {
  if (!isOpen) return;
  return (
    <Calendar
      mode="range"
      onSelect={(v) => {
        console.log(v);
      }}
      className={cn("rounded-md border bg-white", className)}
    />
  );
}

// 1 3 4 5 2 11 10 5 12 777 unde
