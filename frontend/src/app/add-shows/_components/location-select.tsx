/*eslint-disable*/
import { memo } from "react";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  Control,
  useWatch,
} from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types/index";

interface LocationSectionProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  setValue: UseFormSetValue<ShowType>;
  control: Control<ShowType>;
}

declare global {
  interface Window {
    daum: {
      Postcode: new (config: { oncomplete(data: any): void }) => {
        open(): void;
      };
    };
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        services: {
          Geocoder: new () => {
            addressSearch(
              address: string,
              callback: (
                result: Array<{
                  x: string;
                  y: string;
                }>,
                status: string,
              ) => void,
            ): void;
          };
        };
      };
    };
  }
}

function LocationSectionComponent({
  register,
  errors,
  setValue,
  control,
}: LocationSectionProps) {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  const location = useWatch({
    control,
    name: "location",
  });

  useEffect(() => {
    if (window.kakao && !isKakaoInitialized) {
      window.kakao.maps.load(() => setIsKakaoInitialized(true));
    }
  }, []);

  const getGeocodeFromAddress = async (address: string): Promise<void> => {
    if (!isKakaoInitialized || !window.kakao?.maps?.services) return;

    const geocoder = new window.kakao.maps.services.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.addressSearch(address, (result, status) => {
        if (status === "OK" && result && result[0]) {
          setValue("longitude", result[0].x);
          setValue("latitude", result[0].y);
          resolve();
        } else {
          reject(new Error("Geocoding failed"));
        }
      });
    });
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: async (data) => {
        setValue("location", data.address);
        try {
          await getGeocodeFromAddress(data.address);
        } catch (error) {}
      },
    }).open();
  };

  return (
    <div className="flex w-full flex-col gap-16 lg:w-full md:w-full">
      <Input
        label="주소 *"
        id="address"
        className="flex h-58 w-full cursor-pointer items-start gap-10 rounded-6 border bg-white p-16"
        placeholder="클릭하여 주소를 검색해주세요"
        readOnly
        error={errors.location?.message}
        onClick={handleAddressSearch}
        {...register("location")}
        value={location}
      />
    </div>
  );
}

const LocationSection = memo(LocationSectionComponent);
LocationSection.displayName = "LocationSection";

export default LocationSection;
