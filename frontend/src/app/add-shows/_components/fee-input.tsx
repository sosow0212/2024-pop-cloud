import { memo } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types";

interface FeeInputProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  control: Control<ShowType>;
}

function FeeInputComponent({ register, control }: FeeInputProps): JSX.Element {
  const fee = useWatch({
    control,
    name: "fee",
  });

  return (
    <Input
      label="입장료"
      type="text"
      className="flex h-58 w-351 items-start gap-10 rounded-6 border bg-white p-16 lg:w-full"
      placeholder="입장료를 입력해주세요"
      {...register("fee", { valueAsNumber: true })}
      value={fee}
    />
  );
}

const FeeInput = memo(FeeInputComponent);
FeeInput.displayName = "FeeInput";

export default FeeInput;
