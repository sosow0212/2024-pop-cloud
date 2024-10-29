import clsx from "clsx";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types/index";

interface BasicInfoProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
}

export default function BasicInfo({ register, errors }: BasicInfoProps) {
  return (
    <>
      <Input
        label="팝업/전시회 이름 *"
        id="title"
        className="flex h-58 w-full items-start gap-10 self-stretch rounded-6 border bg-white p-16 lg:w-full"
        placeholder="팝업/전시회 이름을 입력해주세요"
        type="text"
        error={errors.title?.message}
        {...register("title")}
      />

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
          <p className="text-14-400 text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      <Input
        label="입장료"
        type="text"
        className="flex h-58 w-351 items-start gap-10 rounded-6 border bg-white p-16 lg:w-full"
        placeholder="입장료를 입력해주세요"
        {...register("fee", { valueAsNumber: true })}
      />
    </>
  );
}
