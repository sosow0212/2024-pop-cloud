"use client";

import { memo } from "react";
import {
  Control,
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  useWatch,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const placeTypes = [
  "브랜드",
  "패션",
  "뷰티",
  "음식",
  "홈",
  "완구류",
  "레저",
  "서적",
  "음악",
  "펫",
  "디지털",
  "운동",
  "예술",
  "전시",
  "굿즈",
  "캐릭터",
  "기타",
] as const;

type PlaceType = (typeof placeTypes)[number];

interface PlaceSelectProps<TFormValues extends FieldValues> {
  register: UseFormRegister<TFormValues>;
  setValue: UseFormSetValue<TFormValues>;
  error?: string;
  name: Path<TFormValues>;
  label?: string;
  control: Control<TFormValues>;
}

function PublicTagSelectComponent<TFormValues extends FieldValues>({
  register,
  setValue,
  error,
  name,
  label = "대표 태그 *",
  control,
}: PlaceSelectProps<TFormValues>) {
  const selectedType = useWatch({
    control,
    name,
    defaultValue: "" as PathValue<TFormValues, Path<TFormValues>>,
  });

  const inputId = `select-${name}`;

  const handleSelect = (value: PlaceType) => {
    setValue(name, value as PathValue<TFormValues, Path<TFormValues>>);
  };

  return (
    <div className="w-full">
      <div className="flex flex-col gap-2">
        <label htmlFor={inputId} className="mb-5 text-16-600">
          {label}
        </label>
        <Select onValueChange={handleSelect} value={selectedType}>
          <SelectTrigger className="w-full" id={inputId}>
            <SelectValue placeholder="대표 태그를 선택해주세요" />
          </SelectTrigger>
          <SelectContent className="h-160 bg-white">
            {placeTypes.map((type) => (
              <SelectItem key={type} value={type} className="cursor-pointer">
                {type}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {error && (
          <p className="text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
        <input
          type="hidden"
          id={`${inputId}-hidden`}
          {...register(name)}
          value={selectedType}
        />
      </div>
    </div>
  );
}

const PublicTagSelect = memo(
  PublicTagSelectComponent,
) as typeof PublicTagSelectComponent;

export default PublicTagSelect;
