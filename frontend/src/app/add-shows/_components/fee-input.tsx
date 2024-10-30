import { memo } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types";

interface FeeInputProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
}

export default function FeeInputComponent({
  register,
}: FeeInputProps): JSX.Element {
  return (
    <Input
      label="입장료"
      type="text"
      className="flex h-58 w-351 items-start gap-10 rounded-6 border bg-white p-16 lg:w-full"
      placeholder="입장료를 입력해주세요"
      {...register("fee", { valueAsNumber: true })}
    />
  );
}

const FeeInput = memo(FeeInputComponent);
FeeInput.displayName = "FeeInput";
