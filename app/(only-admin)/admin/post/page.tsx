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

const zodSchema = z.object({
  category: z.string(),
  title: z.string().min(2, "두 글자 이상"),
  description: z.string().min(5, "다섯 글자 이상"),
  publicTag: z.string().min(1),
  img: z.string().array().min(1),
  startDate: z.string().date(),
  endDate: z.string().date(),
  startTime: z.string().time(),
  closeTime: z.string().time(),
  parking: z.boolean(),
  location: z.string().min(1),
  latitude: z.number(),
  longitude: z.number(),

  // openTimes: z.object({
  //   startTime: z.date(),
  //   closeTime: z.date(),
  // }),
  // place: z.object({
  // location: z.string(),
  // latitude: z.number(),
  // longitude: z.number(),
  // }),
});

const AdminPostPage = () => {
  const router = useRouter();

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues: {
      category: "",
      title: "",
      description: "",
      publicTag: "",
      img: "",
      startDate: new Date(),
      endDate: new Date(),
      startTime: new Date(),
      closeTime: new Date(),
      parking: false,
      location: null,
      latitude: null,
      longitude: null,
    },
  });

  const onValid = async (v: FieldValues) => {
    console.log(v);
    // try {
    //   const res = await fetch("/api/content/post", {
    //     method: "POST",
    //     // body: JSON.stringify(event.target),
    //   });
    //   if (!res.ok) throw new Error("something is wrong");
    //   const data = await res.json();
    //   router.push(`/category/${data.category}/${data.id}`);
    // } catch (error) {
    //   alert(error);
    // }
  };
  const onInvalid = (e: FieldErrors<FieldValues>) => {
    console.log(e);
  };
  return (
    <section className="mt-10 h-full">
      <form
        className="flex flex-col space-y-6"
        // action={(e) => {
        //   console.log(e.get("category"));
        // }}
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
          <Select>
            <SelectTrigger>
              <SelectValue
                placeholder="대표 해시태그"
                {...register("publicTag")}
              />
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

        {/* 오픈-종료 날자 + 시간*/}
        <div className="flex">
          <Calendar mode="range" />
          <div className="flex w-full flex-col items-start justify-start space-y-4 py-4 *:w-2/3">
            <Input
              type="date"
              placeholder="시작 날짜"
              {...register("startDate")}
            />
            <Input
              type="date"
              placeholder="종료 날짜"
              {...register("endDate")}
            />
            <Input
              type="time"
              placeholder="open~close Time"
              className="w-2/3"
              // 시간 값 레지스터
            />
          </div>
        </div>
        {/* image 등록 -> 첫 사진 썸넬 */}

        {/* 주차 가능 여부 */}
        <div className="flex items-center space-x-2">
          <div>
            <input
              type="radio"
              id="available-parking"
              value="available"
              className="peer hidden"
              {...register("parking")}
            />
            <label
              htmlFor="available-parking"
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition-all hover:bg-slate-100 peer-checked:bg-blue-500 peer-checked:text-white"
            >
              주차 가능
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="disavailable-parking"
              value="disavailable"
              className="peer hidden"
              defaultChecked
              {...register("parking")}
            />

            <label
              htmlFor="disavailable-parking"
              className="cursor-pointer rounded-md border px-4 py-2 text-sm transition-all hover:bg-slate-100 peer-checked:bg-red-500 peer-checked:text-white"
            >
              주차 불가능
            </label>
          </div>
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
