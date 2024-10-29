/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

import Input from "@/components/common/input";

import { ShowType } from "../types";
import { addShowForm } from "../validations/schema";

export default function AddShowsForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ShowType>({
    resolver: zodResolver(addShowForm),
    mode: "onChange",
  });

  return (
    <form className="flex flex-col items-center gap-24 px-40 py-12">
      <Input
        label="팝업/전시회 이름"
        id="showTitle"
        className="flex h-58 w-351 items-start gap-10 self-stretch rounded-6 border bg-white p-16"
        placeholder="팝업/전시회 이름을 입력해주세요"
        type="email"
        error={errors.title?.message}
        {...register("title")}
      />
    </form>
  );
}
