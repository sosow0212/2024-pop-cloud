"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PUBLIC_TAGS } from "@/constants";
import { useRouter } from "next/navigation";
import { useState } from "react";

/**
 * contentType 
 * title, description,  publicTag ,image
 * 
 * startDate , endDate , openTimes
    latitude , longitude ,location, isParkingAvailable

 */
const AdminPostPage = () => {
  const [formData, setFormData] = useState();
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const res = await fetch("/api/content/post", {
        method: "POST",
        body: JSON.stringify(event.target),
      });
      if (!res.ok) throw new Error("something is wrong");
      const data = await res.json();
      router.push(`/category/${data.category}/${data.id}`);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <section className="mt-10 h-full">
      <form className="flex flex-col space-y-6" action="#">
        <div className="flex items-center space-x-2">
          <div>
            <input
              type="radio"
              id="popup-category"
              name="category"
              value="popup"
              className="peer hidden"
              defaultChecked
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
              name="category"
              value="exhibition"
              className="peer hidden"
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
          <Input type="text" placeholder="title" />
          <Select>
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
        <Input type="text" placeholder="description" />

        {/* 오픈-종료 날자 + 시간*/}
        <div className="flex">
          <Calendar mode="range" />
          <div className="flex w-full flex-col items-start justify-start space-y-4 py-4 *:w-2/3">
            <Input type="date" placeholder="시작 날짜" />
            <Input type="date" placeholder="종료 날짜" />
            <Input
              type="time"
              placeholder="open~close Time"
              className="w-2/3"
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
              name="parking"
              value="available"
              className="peer hidden"
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
              name="parking"
              value="disavailable"
              className="peer hidden"
              defaultChecked
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
