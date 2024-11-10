"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";

import createPopup from "@/api/create-popup";
import { ApiError } from "@/custom-error";

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
  const [apiError, setApiError] = useState<string>("");
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

  const formValues = useWatch({ control }); //eslint-disable-line

  const onSubmit = async (data: ShowType) => {
    try {
      setIsLoading(true);
      setApiError("");

      const response = await createPopup({
        ...data,
      });

      console.log("팝업스토어가 성공적으로 생성되었습니다:", response); //eslint-disable-line
      router.push("/shows");
    } catch (error) {
      console.error("Error:", error); //eslint-disable-line
      if (error instanceof ApiError) {
        setApiError(error.message);
      } else {
        setApiError("알 수 없는 오류가 발생했습니다.");
      }
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
          "h-58 w-full rounded-6 text-white transition-colors lg:w-full",
          {
            "bg-gray-300 cursor-not-allowed": !isValid || isLoading,
            "bg-blue-500 hover:bg-blue-600": isValid && !isLoading,
          },
        )}
      >
        {isLoading ? "등록 중..." : "등록하기"}
      </button>

      {/* API 에러 메시지 표시 */}
      {apiError && (
        <div className="text-center text-14-400 text-red-500">{apiError}</div>
      )}

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
