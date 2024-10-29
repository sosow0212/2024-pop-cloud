"use client";

import "react-datepicker/dist/react-datepicker.css";

import DatePicker from "react-datepicker";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { ShowType } from "../types/index";

interface DateTimeSectionProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  setValue: UseFormSetValue<ShowType>;
  watch: UseFormWatch<ShowType>;
}

export default function DateTimeSection({
  register,
  errors,
  setValue,
  watch,
}: DateTimeSectionProps) {
  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const handleStartDateChange = (date: Date | null) => {
    setValue(
      "startDate",
      date ? new Date(date.setHours(17, 7, 41, 789)).toISOString() : "",
    );
  };

  const handleEndDateChange = (date: Date | null) => {
    setValue(
      "endDate",
      date ? new Date(date.setHours(17, 7, 41, 789)).toISOString() : "",
    );
  };

  return (
    <>
      <div className="flex w-351 gap-12 lg:w-full">
        <div className="flex-1">
          <label htmlFor="startDate" className="mb-5 block text-16-600">
            시작일 *
          </label>
          <DatePicker
            selected={startDate ? new Date(startDate) : null}
            onChange={handleStartDateChange}
            className="flex h-58 w-full items-start gap-10 rounded-6 border bg-white p-12"
            placeholderText="시작일을 선택해주세요"
            dateFormat="yyyy-MM-dd"
          />
          {errors.startDate?.message && (
            <p className="text-14-400 text-red-500">
              {errors.startDate.message}
            </p>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="endDate" className="mb-5 block text-16-600">
            종료일 *
          </label>
          <DatePicker
            selected={endDate ? new Date(endDate) : null}
            onChange={handleEndDateChange}
            className="flex h-58 w-full items-start gap-10 rounded-6 border bg-white p-12"
            placeholderText="종료일을 선택해주세요"
            dateFormat="yyyy-MM-dd"
            minDate={startDate ? new Date(startDate) : undefined}
          />
          {errors.endDate?.message && (
            <p className="text-14-400 text-red-500">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      <div className="w-351 lg:w-full">
        <label htmlFor="openTimes" className="mb-5 block text-16-600">
          운영시간 *
        </label>
        <textarea
          className="h-58 w-full resize-none rounded-6 border p-16"
          placeholder="운영시간을 입력해주세요 (예: 평일 09:00 ~ 18:00)"
          {...register("openTimes")}
        />
        {errors.openTimes?.message && (
          <p className="text-14-400 text-red-500">{errors.openTimes.message}</p>
        )}
      </div>
    </>
  );
}
