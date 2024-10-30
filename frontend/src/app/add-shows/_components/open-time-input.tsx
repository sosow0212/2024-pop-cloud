"use client";

import clsx from "clsx";
import { memo } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

import { ShowType } from "../types/index";

interface OpenTimesInputProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  control: Control<ShowType>;
}

function OpenTimesInputComponent({
  register,
  errors,
  control,
}: OpenTimesInputProps): JSX.Element {
  const openTimes = useWatch({
    control,
    name: "openTimes",
  });

  return (
    <div className="w-full md:w-full lg:w-full">
      <label htmlFor="openTimes" className="mb-5 block text-16-600">
        운영시간 *
      </label>
      <textarea
        id="openTimes"
        className={clsx(
          "h-90 w-full resize-none rounded-6 border p-16",
          errors.openTimes && "border-red-500",
        )}
        placeholder="운영시간을 입력해주세요 (예: 평일 09:00 ~ 18:00)"
        {...register("openTimes")}
        value={openTimes}
      />
      {errors.openTimes?.message && (
        <p className="text-14-400 text-red-500">{errors.openTimes.message}</p>
      )}
    </div>
  );
}

const OpenTimesInput = memo(OpenTimesInputComponent);
OpenTimesInput.displayName = "OpenTimesInput";

export default OpenTimesInput;
