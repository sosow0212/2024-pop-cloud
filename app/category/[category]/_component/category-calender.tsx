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

  useEffect(() => {
    if (range && range.from && range.to) handleDate(range.from, range.to);
  }, [range, handleDate]);

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
