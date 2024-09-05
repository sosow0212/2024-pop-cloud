"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PUBLIC_TAGS } from "@/constants";
import { useRouter } from "next/navigation";

import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { CircleX, Divide, ImageUp } from "lucide-react";

const zodSchema = z.object({
  category: z.string(),
  title: z.string().min(2, "두 글자 이상"),
  description: z.string().min(5, "다섯 글자 이상"),
  publicTag: z.string().min(1),
  img: z.string().array().min(1),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string().time(),
  closeTime: z.string().time(),
  parking: z.boolean(),
  location: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),
});

const TIME = Array.from({ length: 25 })
  .map((_, idx) => [
    `${idx.toString().padStart(2, "0")}:00`,
    `${idx.toString().padStart(2, "0")}:30`,
  ])
  .flat()
  .slice(0, 49);

const defaultValues = {
  category: "",
  title: "",
  description: "",
  publicTag: "",
  img: "",
  startDate: new Date(),
  endDate: new Date(),
  startTime: "00:00:00",
  closeTime: "00:00:00",
  parking: false,
  location: null,
  latitude: null,
  longitude: null,
};

const AdminPostPage = () => {
  const router = useRouter();
  const [images, setImages] = useState([3, 4]);
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });
  const [startTimeIdx, setStartTimeIdx] = useState(-1);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  const onValid = async (v: FieldValues) => {
    console.log(v);
  };

  const onInvalid = (e: FieldErrors<FieldValues>) => {
    console.log(e);
  };

  useEffect(() => {
    if (selectedDate) {
      const { from, to } = selectedDate;
      if (from) setValue("startDate", from);
      if (to) setValue("endDate", to);
    }
  }, [selectedDate, setValue]);

  return (
    <section className="mt-10 h-full">
      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit(onValid, onInvalid)}
      >
        <div className="flex items-center space-x-2">
          <div>
            <input
              type="radio"
              id="popup-category"
              value="popup"
              className="peer hidden"
              defaultChecked
              {...register("category")}
            />
            <label
              htmlFor="popup-category"
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition-all hover:bg-slate-100 peer-checked:bg-blue-500 peer-checked:text-white"
            >
              팝업스토어
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="exhibition-category"
              value="exhibition"
              className="peer hidden"
              {...register("category")}
            />

            <label
              htmlFor="exhibition-category"
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition-all hover:bg-slate-100 peer-checked:bg-blue-500 peer-checked:text-white"
            >
              개인전시회
            </label>
          </div>
        </div>

        {/* 제목 및 해시태그 선택 */}
        <div className="flex space-x-2">
          <Input type="text" placeholder="title" {...register("title")} />
          <Select onValueChange={(v) => setValue("publicTag", v)}>
            <SelectTrigger>
              <SelectValue placeholder="대표 해시태그" />
            </SelectTrigger>
            <SelectContent>
              {PUBLIC_TAGS.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Input
          type="text"
          placeholder="description"
          {...register("description")}
        />
        {/* image 등록 -> 첫 사진 썸넬 */}
        <div className="grid h-[20vh] grid-cols-5 gap-x-3">
          {images?.map((image, idx) => (
            <div
              key={image}
              className="relative col-span-1 rounded-md bg-blue-300"
            >
              {idx === 0 && (
                <div className="absolute left-1 top-1 rounded-md bg-black px-2 py-1 text-[0.7rem] text-white">
                  대표 이미지
                </div>
              )}
              <CircleX className="absolute right-0 top-0 z-20 size-6 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white" />
            </div>
          ))}
          <input
            style={{ display: "none" }}
            type="file"
            name="img"
            id="img-upload"
            onChange={(e) => console.log(e.target.value)}
          />

          <label
            htmlFor="img-upload"
            className="group col-span-1 flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border hover:border-black"
          >
            <ImageUp className="size-10 stroke-slate-400 stroke-1 group-hover:stroke-black" />
            <div className="text-[0.8rem] font-medium text-slate-400 group-hover:text-black">
              이미지 업로드
            </div>
          </label>
        </div>
        {/* 오픈-종료 날자 + 시간*/}
        <div className="flex">
          <Calendar
            mode="range"
            onSelect={(r) => {
              if (r) {
                const { from, to } = r;
                if (from)
                  setSelectedDate({
                    from,
                    to: to || from,
                  });
              }
            }}
            selected={selectedDate}
          />
          <div className="flex w-full flex-col items-start justify-start space-y-4 py-4 *:w-2/3">
            <Input
              type="date"
              placeholder="시작 날짜"
              // value={selectedDate?.from}
              value={format(selectedDate.from, "yyyy-MM-dd")}
              readOnly
            />
            <Input
              type="date"
              placeholder="종료 날짜"
              value={format(selectedDate.to, "yyyy-MM-dd")}
              readOnly
            />
            {/* 오픈 시간 */}
            <Select
              onValueChange={(v) => {
                const [value, idx] = v.split(" ");
                setValue("startTime", value);
                setStartTimeIdx(+idx);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="오픈 시간" />
              </SelectTrigger>
              <SelectContent>
                {TIME.map((p, idx) => (
                  <SelectItem key={p} value={`${p}:00 ${idx}`}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {/* 마감 시간 */}
            <Select onValueChange={(v) => setValue("closeTime", v)}>
              <SelectTrigger>
                <SelectValue placeholder="마감 시간" />
              </SelectTrigger>
              <SelectContent>
                {TIME.filter((_, idx) => idx > startTimeIdx).map((p) => (
                  <SelectItem key={p} value={`${p}:00`}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available-parking"
            className="peer hidden"
            {...register("parking")}
          />
          <label
            htmlFor="available-parking"
            className="cursor-pointer rounded-md border px-4 py-2 text-sm transition-all hover:bg-slate-100 peer-checked:bg-blue-500 peer-checked:text-white"
          >
            주차 가능
          </label>
          <label
            htmlFor="available-parking"
            className="cursor-pointer rounded-md border bg-red-500 px-4 py-2 text-sm text-white transition-all peer-checked:bg-white peer-checked:text-black peer-checked:hover:bg-slate-100"
          >
            주차 불가능
          </label>
        </div>
        <div className="relative w-full">
          {/* 쥬소 레지스터 해야함 */}
          <Input
            type="text"
            readOnly
            placeholder="주소 입력"
            className="py-5"
          />
          <Button
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-slate-300 text-black hover:bg-slate-400"
            size="sm"
          >
            주소 검색
          </Button>
          {/* 주소 && <Map /> */}
        </div>
        <Button variant="outline">등록하기</Button>
      </form>
    </section>
  );
};

export default AdminPostPage;
