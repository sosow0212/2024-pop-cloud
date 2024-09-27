"use client";

import "react-datepicker/dist/react-datepicker.css";

import React, { useState } from "react";
import DatePicker from "react-datepicker";

interface DatePickerProps {
  selectedDate: Date | null;
  onChange: (date: Date | null) => void;
}

export function DatePickerComponent({
  selectedDate,
  onChange,
}: DatePickerProps) {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={onChange}
      className="w-full border border-gray-300 p-2"
      placeholderText="날짜 선택"
      dateFormat="yyyy/MM/dd"
    />
  );
}

export default function DateFilter() {
  const [startDate, setStartDate] = useState<Date | null>(null);

  return (
    <DatePickerComponent selectedDate={startDate} onChange={setStartDate} />
  );
}
