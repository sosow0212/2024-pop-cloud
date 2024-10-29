/*eslint-disable*/

import Script from "next/script";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types/index";

interface LocationSectionProps {
  register: UseFormRegister<ShowType>;
  errors: FieldErrors<ShowType>;
  setValue: UseFormSetValue<ShowType>;
}
declare global {
  interface Window {
    daum: {
      Postcode: new (config: { oncomplete(data: any): void }) => {
        open(): void;
      };
    };
  }
}

export default function LocationSection({
  register,
  errors,
  setValue,
}: LocationSectionProps) {
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete(data: any) {
        setValue("location", data.address);
      },
    }).open();
  };

  return (
    <>
      <Script
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
        strategy="beforeInteractive"
      />

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
        />
      </div>
    </>
  );
}
