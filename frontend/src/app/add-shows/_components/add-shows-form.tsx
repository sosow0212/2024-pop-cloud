"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ShowType } from "../types";
import { addShowForm } from "../validations/schema";
import BasicInfo from "./basic-info";
import DateTimeSection from "./date-time-select";
import FacilitiesSection from "./facilities-section";
import LocationSection from "./location-select";
import TagSection from "./tag-select";

export default function AddShowsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const {
    register,
    setValue,
    watch,
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

  const formValues = watch(); //eslint-disable-line

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

      <BasicInfo register={register} errors={errors} />

      <DateTimeSection
        register={register}
        errors={errors}
        setValue={setValue}
        watch={watch}
      />

      <LocationSection
        register={register}
        errors={errors}
        setValue={setValue}
      />

      <TagSection
        register={register}
        errors={errors}
        tagInput={tagInput}
        setTagInput={setTagInput}
        selectedTags={selectedTags}
        setSelectedTags={setSelectedTags}
        setValue={setValue}
      />

      <FacilitiesSection register={register} />
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
        <div>Is Complete: {isFormComplete.toString()}</div>
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
