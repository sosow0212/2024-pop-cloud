// ./end-date-input.tsx

"use client";

import "react-datepicker/dist/react-datepicker.css";

import { memo } from "react";
import DatePicker from "react-datepicker";
import { FieldErrors, UseFormSetValue, UseFormWatch } from "react-hook-form";

import { ShowType } from "../types/index";
import { parseISODate, toISOWithTime } from "../utils/date-utils";

interface EndDateInputProps {
  errors: FieldErrors<ShowType>;
  setValue: UseFormSetValue<ShowType>;
  watch: UseFormWatch<ShowType>;
}

export default function EndDateInputComponent({
  errors,
  setValue,
  watch,
}: EndDateInputProps): JSX.Element {
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleEndDateChange = (date: Date | null) => {
    setValue("endDate", date ? toISOWithTime(date) : "");
  };

  return (
    <div className="flex-1">
      <label htmlFor="endDate" className="mb-5 block text-16-600">
        종료일 *
      </label>
      <DatePicker
        id="endDate"
        selected={parseISODate(endDate) || null}
        onChange={handleEndDateChange}
        className="flex h-58 w-full items-start gap-10 rounded-6 border bg-white p-12 md:w-340 lg:w-540"
        placeholderText="종료일을 선택해주세요"
        dateFormat="yyyy-MM-dd"
        minDate={parseISODate(startDate)}
      />
      {errors.endDate?.message && (
        <p className="text-14-400 text-red-500">{errors.endDate.message}</p>
      )}
    </div>
  );
}

const EndDateInput = memo(EndDateInputComponent);
EndDateInput.displayName = "EndDateInput";
