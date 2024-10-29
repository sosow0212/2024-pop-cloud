import { UseFormRegister } from "react-hook-form";

import { ShowType } from "../types/index";

interface FacilitiesSectionProps {
  register: UseFormRegister<ShowType>;
}

export default function FacilitiesSection({
  register,
}: FacilitiesSectionProps) {
  return (
    <div className="w-351 md:w-full lg:w-full">
      <label htmlFor="facil" className="mb-4 block text-16-600">
        편의시설
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isParkingAvailable")}
            className="size-13"
          />
          주차 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isFoodAllowed")}
            className="size-13"
          />
          음식물 반입 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isPetAllowed")}
            className="size-13"
          />
          반려동물 동반 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isKidsZone")}
            className="size-13"
          />
          키즈존
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isWifiAvailable")}
            className="size-13"
          />
          와이파이
        </label>
      </div>
    </div>
  );
}
