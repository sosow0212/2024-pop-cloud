"use client";

import "react-datepicker/dist/react-datepicker.css";

import { memo } from "react";
import DatePicker from "react-datepicker";
import {
  Control,
  FieldErrors,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import { ShowType } from "../types/index";
import { parseISODate, toISOWithTime } from "../utils/date-utils";

interface StartDateInputProps {
  errors: FieldErrors<ShowType>;
  setValue: UseFormSetValue<ShowType>;
  control: Control<ShowType>;
}

function StartDateInputComponent({
  errors,
  setValue,
  control,
}: StartDateInputProps): JSX.Element {
  const startDate = useWatch({
    control,
    name: "startDate",
  });

  const handleStartDateChange = (date: Date | null) => {
    setValue("startDate", date ? toISOWithTime(date) : "");
  };

  return (
    <div className="flex-1">
      <label htmlFor="startDate" className="mb-5 block text-16-600">
        시작일 *
      </label>
      <DatePicker
        id="startDate"
        selected={parseISODate(startDate) || null}
        onChange={handleStartDateChange}
        className="flex h-58 w-full items-start gap-10 rounded-6 border bg-white p-12 md:w-340 lg:w-500"
        placeholderText="시작일을 선택해주세요"
        dateFormat="yyyy-MM-dd"
      />
      {errors.startDate?.message && (
        <p className="text-14-400 text-red-500">{errors.startDate.message}</p>
      )}
    </div>
  );
}

const StartDateInput = memo(StartDateInputComponent);
StartDateInput.displayName = "StartDateInput";

export default StartDateInput;
