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

import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { CircleX, ImageUp } from "lucide-react";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { cn } from "zero-cnn";
import { useModalStore } from "@/lib/store";

const zodSchema = z.object({
  category: z.string(),
  title: z.string().min(2, "두 글자 이상"),
  description: z.string().min(5, "다섯 글자 이상"),
  publicTag: z.string().min(1),
  images: z.string().array().min(1),
  startDate: z.date(),
  endDate: z.date(),
  startTime: z.string().time(),
  closeTime: z.string().time(),
  parking: z.boolean(),
  address: z.string().min(1),
  zonecode: z.string().min(1),
  latitude: z.string(),
  longitude: z.string(),
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
  images: [] as string[],
  startDate: new Date(),
  endDate: new Date(),
  startTime: "",
  closeTime: "",
  parking: false,
  address: "",
  zonecode: "",
  latitude: null,
  longitude: null,
};

interface ImageFile {
  file: File;
  preview: string;
}

const AdminPostPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const { onOpen, isOpen } = useModalStore();

  const draggingRef = useRef(-1);
  const dragOverREf = useRef(-1);

  const [images, setImages] = useState<string[]>([]);
  const [imageFiles, setImageFiles] = useState<ImageFile[]>([]);

  const [imagePending, setImagePending] = useState(false);
  const [addressValue, setAddressValue] = useState<string>();
  const {
    setValue,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(zodSchema),
    defaultValues,
  });

  const [startTimeIdx, setStartTimeIdx] = useState(-1);
  const [selectedDate, setSelectedDate] = useState({
    from: new Date(),
    to: new Date(),
  });

  useEffect(() => {
    if (selectedDate) {
      const { from, to } = selectedDate;

      if (from) setValue("startDate", from);
      if (to) setValue("endDate", to);
    }
  }, [selectedDate, setValue]);

  useEffect(() => {
    if (isOpen === false) {
      const sessionAddress = sessionStorage.getItem(
        process.env.NEXT_PUBLIC_POST_ADDRESS!,
      );
      if (sessionAddress) {
        const { address, zonecode, latitude, longitude } =
          JSON.parse(sessionAddress);
        setValue("address", address);
        setValue("zonecode", zonecode);
        setValue("latitude", latitude);
        setValue("longitude", longitude);
        setAddressValue(`(${zonecode}) ${address}`);
      }
    }
  }, [isOpen, setValue]);

  const onValid = async (v: FieldValues) => {
    // 서버로 images 대신 imageFiles을 보내줘야 함
    console.log(v);
    sessionStorage.removeItem(process.env.NEXT_PUBLIC_POST_ADDRESS!);
  };

  const onInvalid = (e: FieldErrors<FieldValues>) => {
    console.log(e);
  };

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setImagePending(true);
    try {
      const files = event.target.files;

      if (!files) throw new Error("something error on Upload");
      if (files.length + images.length > 5) {
        throw new Error("이미지 파일은 5개 이하로 만들어주세요");
      }

      const newImageFiles: ImageFile[] = Array.from(files).map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));
      setImageFiles((prevFiles) => [...prevFiles, ...newImageFiles]);
      setImages((prevImages) => [
        ...prevImages,
        ...newImageFiles.map((img) => img.preview),
      ]);
    } catch (error) {
      if (error instanceof Error) {
        toast({
          variant: "destructive",
          title: "이미지 업로드 에러",
          description: error.message,
        });
      }
      console.log(error);
    } finally {
      setImagePending(false);
    }
  };

  useEffect(() => {
    return () => {
      imageFiles.forEach((imageFile) => URL.revokeObjectURL(imageFile.preview));
    };
  }, [imageFiles]);

  return (
    <section className="mt-10 h-full">
      {imagePending && (
        <div
          style={{ zIndex: 9999 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50"
        >
          <div className="loader" />
        </div>
      )}

      <form
        className="flex flex-col space-y-6"
        onSubmit={handleSubmit(onValid, onInvalid)}
        noValidate
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
          <Input
            className={
              errors.title && "border-red-500 focus-visible:ring-red-400"
            }
            type="text"
            required
            placeholder="title"
            {...register("title")}
          />
          <Select required onValueChange={(v) => setValue("publicTag", v)}>
            <SelectTrigger
              className={cn(
                errors.publicTag &&
                  watch("publicTag").length === 0 &&
                  "border-red-500 focus:ring-red-400",
              )}
            >
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
          className={
            errors.description && "border-red-500 focus-visible:ring-red-400"
          }
          required
          {...register("description")}
        />
        {/* image 등록*/}
        <div className="grid h-[20vh] grid-cols-5 gap-x-3">
          {images?.map((image, idx) => (
            <div
              key={image}
              className="relative col-span-1 rounded-md bg-slate-200"
              draggable
              onDragStart={(e) => {
                draggingRef.current = idx;
              }}
              onDragOver={(e) => {
                e.preventDefault();
                dragOverREf.current = idx;
              }}
              onDragEnd={() => {
                const draggingIndex = draggingRef.current;
                const targetIndex = dragOverREf.current;

                if (draggingIndex === targetIndex) {
                  return;
                }

                setImages((prevImages) => {
                  const newImages = [...prevImages];
                  const [removed] = newImages.splice(draggingIndex, 1);
                  newImages.splice(targetIndex, 0, removed);
                  return newImages;
                });
              }}
            >
              <Image
                fill
                alt="이미지"
                src={image}
                className="rounded-md object-cover"
              />
              {idx === 0 && (
                <div className="absolute left-1 top-1 rounded-md bg-black px-2 py-1 text-[0.7rem] text-white">
                  대표 이미지
                </div>
              )}
              <CircleX
                onClick={() =>
                  setImages((p) => p.filter((iUrl) => iUrl !== image))
                }
                className="absolute right-0 top-0 z-20 size-6 -translate-y-1/2 translate-x-1/2 cursor-pointer rounded-full bg-white"
              />
            </div>
          ))}
          <input
            required
            style={{ display: "none" }}
            type="file"
            name="img"
            id="img-upload"
            onChange={handleUploadImage}
            multiple
            accept="image/*"
          />

          <label
            htmlFor="img-upload"
            className={cn(
              `group flex cursor-pointer flex-col items-center justify-center space-y-2 rounded-md border hover:border-black`,
              images.length >= 5 ? "hidden" : "col-span-1",
              errors.images &&
                watch("images").length === 0 &&
                "border-red-500 focus-visible:ring-red-400",
            )}
          >
            <ImageUp className="size-10 stroke-slate-400 stroke-1 group-hover:stroke-black" />
            <div className="text-center text-[0.8rem] font-medium text-slate-400 group-hover:text-black">
              <div>이미지 업로드</div>
              <div>({images.length}/5)</div>
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
              required
              type="date"
              placeholder="시작 날짜"
              // value={selectedDate?.from}
              value={format(selectedDate.from, "yyyy-MM-dd")}
              readOnly
              className={
                errors.startDate && "border-red-500 focus-visible:ring-red-400"
              }
            />
            <Input
              required
              type="date"
              placeholder="종료 날짜"
              value={format(selectedDate.to, "yyyy-MM-dd")}
              readOnly
              className={
                errors.endDate && "border-red-500 focus-visible:ring-red-400"
              }
            />
            {/* 오픈 시간 */}
            <Select
              required
              onValueChange={(v) => {
                const [value, idx] = v.split(" ");
                setValue("startTime", value);
                setStartTimeIdx(+idx);
              }}
            >
              <SelectTrigger
                className={cn(
                  errors.startTime &&
                    watch("startTime").length === 0 &&
                    "border-red-500 focus:ring-red-400",
                )}
              >
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
            <Select required onValueChange={(v) => setValue("closeTime", v)}>
              <SelectTrigger
                className={cn(
                  errors.closeTime &&
                    watch("closeTime").length === 0 &&
                    "border-red-500 focus:ring-red-400",
                )}
              >
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

        {/* 주차 가능 불가능 */}
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
        {/* 주소 + 위도 경도 */}
        <div className="relative w-full">
          {/* 쥬소 레지스터 해야함 */}
          <div
            className={cn(
              "rounded-md border px-2 py-3",
              errors.address &&
                watch("address").length === 0 &&
                "border-red-500 ring-1 ring-red-400 ring-offset-2",
            )}
          >
            {addressValue ? addressValue : "주소를 입력해주세요."}
          </div>
          <div
            onClick={() => onOpen("map")}
            className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer rounded-md bg-slate-300 px-2 py-1 text-black transition-all hover:bg-blue-500 hover:text-white"
          >
            주소 검색
          </div>
          {/* 주소 && <Map /> */}
        </div>
        <Button variant="outline">등록하기</Button>
      </form>
    </section>
  );
};

export default AdminPostPage;
