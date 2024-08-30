import { Calendar } from "@/components/ui/calendar";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { DateRange } from "react-day-picker";

import { cn } from "zero-cnn";

interface CategoryCalendarProps {
  className: string;
  isOpen: boolean;
  handleDate: (s: Date, e: Date) => void;
}
const defaultRange: DateRange = {
  from: new Date(),
  to: new Date(),
};

export function CategoryCalendar({
  className,
  handleDate,
  isOpen,
}: CategoryCalendarProps) {
  const [range, setRange] = useState<DateRange | undefined>(defaultRange);

  const handleSelect = useCallback(() => {
    if (range && range.from && range.to) handleDate(range.from, range.to);
  }, [range]);

  useEffect(() => {
    handleSelect();
  }, [handleSelect]);
  if (!isOpen) return;
  return (
    <Calendar
      mode="range"
      onSelect={setRange}
      selected={range}
      className={cn("rounded-md border bg-white", className)}
    />
  );
}

// 1 3 4 5 2 11 10 5 12 777 unde
