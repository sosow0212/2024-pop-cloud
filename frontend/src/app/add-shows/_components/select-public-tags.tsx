"use client";

import { useState } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";

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
  error?: string;
  name: Path<TFormValues>;
  label?: string;
}

function PublicTagSelect<TFormValues extends FieldValues>({
  register,
  error,
  name,
  label = "대표 태그",
}: PlaceSelectProps<TFormValues>) {
  const [selectedType, setSelectedType] = useState<PlaceType | "">("");
  const inputId = `select-${name}`;

  const handleSelect = (value: PlaceType) => {
    setSelectedType(value);
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

export default PublicTagSelect;
