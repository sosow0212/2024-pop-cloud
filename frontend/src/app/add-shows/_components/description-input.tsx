import clsx from "clsx";
import { memo } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { ShowType } from "../types";

interface DescriptionInputProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
}

export default function DescriptionInputComponent({
  register,
  errors,
}: DescriptionInputProps): JSX.Element {
  return (
    <div className="w-full md:w-full lg:w-full">
      <label htmlFor="description" className="mb-5 block text-16-600">
        설명 *
      </label>
      <textarea
        id="description"
        className={clsx(
          "h-138 w-full resize-none rounded-6 border p-16",
          errors.description && "border-red-500",
        )}
        placeholder="팝업/전시회 설명을 입력해주세요"
        {...register("description")}
      />
      {errors.description?.message && (
        <p className="text-14-400 text-red-500">{errors.description.message}</p>
      )}
    </div>
  );
}

const DescriptionInput = memo(DescriptionInputComponent);
DescriptionInput.displayName = "DescriptionInput";
