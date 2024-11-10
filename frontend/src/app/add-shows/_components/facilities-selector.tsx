import { memo } from "react";
import { Control, UseFormRegister, useWatch } from "react-hook-form";

import { ShowType } from "../types/index";

interface FacilitiesSectionProps {
  register: UseFormRegister<ShowType>;
  control: Control<ShowType>;
}

function FacilitiesSectionComponent({
  register,
  control,
}: FacilitiesSectionProps) {
  const facilities = useWatch({
    control,
    name: [
      "isParkingAvailable",
      "isFoodAllowed",
      "isPetAllowed",
      "isKidsZone",
      "isWifiAvailable",
    ],
  });

  return (
    <div className="w-full md:w-full lg:w-full">
      <label htmlFor="facil" className="mb-4 block text-16-600">
        편의시설
      </label>
      <div className="grid grid-cols-2 gap-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isParkingAvailable")}
            className="size-13"
            checked={facilities[0]}
          />
          주차 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isFoodAllowed")}
            className="size-13"
            checked={facilities[1]}
          />
          음식물 반입 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isPetAllowed")}
            className="size-13"
            checked={facilities[2]}
          />
          반려동물 동반 가능
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isKidsZone")}
            className="size-13"
            checked={facilities[3]}
          />
          키즈존
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            {...register("isWifiAvailable")}
            className="size-13"
            checked={facilities[4]}
          />
          와이파이
        </label>
      </div>
    </div>
  );
}

const FacilitiesSection = memo(FacilitiesSectionComponent);
FacilitiesSection.displayName = "FacilitiesSection";

export default FacilitiesSection;
