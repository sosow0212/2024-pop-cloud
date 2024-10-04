"use client";

import { IoShareSocial } from "react-icons/io5";

import LikeButton from "@/components/common/like-button";
import useToastStore from "@/store/use-toast-store";

interface Props {
  publicTag: string;
  title: string;
}

export default function DetailsHeader({ publicTag, title }: Props) {
  const { showToast } = useToastStore();

  const copyLink = () => {
    const currentUrl = window.document.location.href;
    navigator.clipboard
      .writeText(currentUrl)
      .then(() => {
        showToast({ type: "success", content: "링크가 복사되었습니다" });
      })
      .catch((err) => {
        showToast({ type: "error", content: "링크를 복사하지 못했습니다" });
        throw new Error("Failed to copy: ", err);
      });
  };

  return (
    <section className="w-full text-center">
      <span className="mb-14 block w-full font-extrabold text-blue-5">
        {publicTag}
      </span>
      <h2 className="text-24-600 md:text-32-600 lg:text-32-600">{title}</h2>
      <div className="my-30 flex justify-center gap-16 md:my-40">
        <span className="relative size-40 rounded-full border border-solid border-gray-300 text-red-500">
          <LikeButton className="center" color="text-gray-500" size={24} />
        </span>
        <span className="relative size-40 rounded-full border border-solid border-gray-300">
          <IoShareSocial
            className="center size-20 cursor-pointer text-gray-500"
            onClick={copyLink}
          />
        </span>
      </div>
    </section>
  );
}
