/* eslint-disable */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ShowType } from "../types";
import { addShowForm } from "../validations/schema";

import BasicInfo from "./basic-info";
import DateTimeSection from "./date-time-select";
import LocationSection from "./location-select";
import TagSection from "./tag-select";
import FacilitiesSection from "./facilities-section";

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
    formState: { errors, isDirty, isValid },
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

  // 모든 필수 필드를 감시
  const watchedFields = watch([
    "title",
    "description",
    "startDate",
    "endDate",
    "openTimes",
    "location",
    "publicTag",
  ]);

  const isFormComplete = watchedFields.every(
    (field) => field && field.length > 0,
  );
  const formValues = watch();

  const onSubmit = async (data: ShowType) => {
    try {
      setIsLoading(true);
      console.log(data);
      router.push("/shows");
    } catch (error) {
      console.error("Error:", error);
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
        disabled={!isFormComplete || !isValid || isLoading}
        className={`h-58 w-351 rounded-6 text-white lg:w-full transition-colors ${
          !isFormComplete || !isValid || isLoading
            ? "bg-gray-300 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
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
        <div className="text-red-500 text-14-400 text-center">
          <div>필수입력 항목을 입력해주세요</div>
          {Object.values(errors).map((error, index) => (
            <div key={index}>{error.message}</div>
          ))}
        </div>
      )}
    </form>
  );
}
