import { IoShareSocial } from "react-icons/io5";

import LikeButton from "@/components/common/like-button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Button } from "../ui/button";

interface Props {
  publicTag: string;
  title: string;
}

export default function DetailsHeader({ publicTag, title }: Props) {
  return (
    <section className="w-full text-center">
      <span className="mb-14 block w-full font-extrabold text-blue-5">
        {publicTag}
      </span>
      <h2 className="text-24-600 md:text-32-600 lg:text-32-600">{title}</h2>
      <div className="my-30 flex justify-center gap-16 md:my-40">
        <span className="relative size-40 rounded-full bg-[#555555]/70">
          <LikeButton className="center" color="text-white" size={24} />
        </span>
        <span className="relative size-40 rounded-full bg-[#555555]/70">
          <Popover>
            <PopoverTrigger>
              <IoShareSocial className="center size-20 cursor-pointer text-white" />
            </PopoverTrigger>
            <PopoverContent sideOffset={30} className="bg-white p-10">
              <span>SNS 공유하기</span>
              <div className="flex">
                <input defaultValue="/" className="border border-solid" />
                <Button className="">Copy</Button>
              </div>
            </PopoverContent>
          </Popover>
        </span>
      </div>
    </section>
  );
}
