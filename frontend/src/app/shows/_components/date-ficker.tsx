"use client";

import "react-datepicker/dist/react-datepicker.css";

import React from "react";
import DatePicker from "react-datepicker";

interface DateFilterProps {
  selectedDateRange: { startDate: string; endDate: string };
  onChange: (dateRange: { startDate: string; endDate: string }) => void;
}

export default function DateFilter({
  selectedDateRange,
  onChange,
}: DateFilterProps) {
  const handleStartDateChange = (date: Date | null) => {
    onChange({
      ...selectedDateRange,
      startDate: date ? date.toISOString().split("T")[0] : "",
    });
  };

  const handleEndDateChange = (date: Date | null) => {
    onChange({
      ...selectedDateRange,
      endDate: date ? date.toISOString().split("T")[0] : "",
    });
  };

  return (
    <div className="space-y-4">
      <DatePicker
        selected={
          selectedDateRange.startDate
            ? new Date(selectedDateRange.startDate)
            : null
        }
        onChange={handleStartDateChange}
        className="w-full border border-gray-300 p-2"
        placeholderText="시작 날짜 선택"
        dateFormat="yyyy/MM/dd"
      />
      <DatePicker
        selected={
          selectedDateRange.endDate ? new Date(selectedDateRange.endDate) : null
        }
        onChange={handleEndDateChange}
        className="w-full border border-gray-300 p-2"
        placeholderText="종료 날짜 선택"
        dateFormat="yyyy/MM/dd"
      />
    </div>
  );
}
