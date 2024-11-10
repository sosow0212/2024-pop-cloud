import { memo } from "react";
import {
  Control,
  FieldErrors,
  UseFormRegister,
  useWatch,
} from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types";

interface TitleInputProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  control: Control<ShowType>;
}

function TitleInputComponent({
  register,
  errors,
  control,
}: TitleInputProps): JSX.Element {
  // useWatch를 사용하여 title 필드만 감시
  const title = useWatch({
    control,
    name: "title",
  });

  return (
    <Input
      label="팝업/전시회 이름 *"
      id="title"
      className="flex h-58 w-full items-start gap-10 self-stretch rounded-6 border bg-white p-16 lg:w-full"
      placeholder="팝업/전시회 이름을 입력해주세요"
      type="text"
      error={errors.title?.message}
      {...register("title")}
      value={title}
    />
  );
}
const TitleInput = memo(TitleInputComponent);
TitleInput.displayName = "TitleInput";

export default TitleInput;
