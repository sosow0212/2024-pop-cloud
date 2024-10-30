"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import { ShowType } from "../types";
import { addShowForm } from "../validations/schema";
import CustomTagInput from "./custom-tag-input";
import DescriptionInput from "./description-input";
import EndDateInput from "./end-date-input";
import FacilitiesSection from "./facilities-selector";
import FeeInput from "./fee-input";
import LocationSection from "./location-select";
import OpenTimesInput from "./open-time-input";
import PublicTagSelect from "./select-public-tags";
import StartDateInput from "./start-date-input";
import TitleInput from "./title-input";

export default function AddShowsForm(): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    setValue,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShowType>({
    resolver: zodResolver(addShowForm),
    mode: "all",
    defaultValues: {
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      openTimes: "",
      location: "",
      latitude: "",
      longitude: "",
      tags: [],
      fee: 0,
      isParkingAvailable: false,
      isFoodAllowed: false,
      isPetAllowed: false,
      isKidsZone: false,
      isWifiAvailable: false,
      publicTag: "",
    },
  });

  // 전체 폼 값을 감시
  const formValues = useWatch({ control }); //eslint-disable-line

  const onSubmit = async (data: ShowType) => {
    try {
      setIsLoading(true);
      console.log(data); //eslint-disable-line
      router.push("/shows");
    } catch (error) {
      console.error("Error:", error); //eslint-disable-line
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center gap-24"
    >
      <h1 className="text-24-700">팝업/전시회 등록</h1>

      <TitleInput register={register} errors={errors} control={control} />
      <DescriptionInput register={register} errors={errors} control={control} />
      <FeeInput register={register} errors={errors} control={control} />

      <div className="flex w-full gap-12 md:w-full lg:w-full">
        <StartDateInput errors={errors} setValue={setValue} control={control} />
        <EndDateInput errors={errors} setValue={setValue} control={control} />
      </div>

      <OpenTimesInput register={register} errors={errors} control={control} />

      <LocationSection
        register={register}
        errors={errors}
        setValue={setValue}
        control={control}
      />

      <PublicTagSelect
        register={register}
        setValue={setValue}
        error={errors.publicTag?.message}
        name="publicTag"
        control={control}
      />

      <CustomTagInput
        tagInput={tagInput}
        setTagInput={setTagInput}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setValue={setValue}
        control={control}
      />

      <FacilitiesSection register={register} control={control} />

      <button
        type="submit"
        disabled={!isValid || isLoading}
        className={clsx(
          "h-58 w-351 rounded-6 text-white transition-colors lg:w-full",
          {
            "bg-gray-300 cursor-not-allowed": !isValid || isLoading,
            "bg-blue-500 hover:bg-blue-600": isValid && !isLoading,
          },
        )}
      >
        {isLoading ? "등록 중..." : "등록하기"}
      </button>

      {/* 디버깅 정보 */}
      {/* <div className="text-sm text-gray-500">
        <div>Form Values: {JSON.stringify(formValues, null, 2)}</div>
        <div>Is Valid: {isValid.toString()}</div>
        <div>Has Errors: {Object.keys(errors).length > 0 ? "Yes" : "No"}</div>
        {Object.entries(errors).map(([key, error]) => (
          <div key={key}>
            {key}: {error.message}
          </div>
        ))}
      </div> */}

      {Object.keys(errors).length > 0 && (
        <div className="text-center text-14-400 text-red-500">
          <div>필수입력 항목을 입력해주세요</div>
          {Object.entries(errors).map(([fieldName, error]) => (
            <div key={fieldName}>{error.message}</div>
          ))}
        </div>
      )}
    </form>
  );
}
