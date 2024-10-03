"use client";

import { FaBan, FaCheckCircle } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi2";
import { IoIosWarning } from "react-icons/io";

import useToastStore from "@/store/use-toast-store";

export default function Toast() {
  const { toast, isOpen } = useToastStore();

  const pointColorMap = {
    info: "bg-[#3B82F6]",
    success: "bg-[#10B981]",
    warn: "bg-[#EAB308]",
    danger: "bg-[#DC2626]",
  };

  const iconMap = {
    info: <HiInformationCircle color="#3B82F6" />,
    success: <FaCheckCircle color="#10B981" />,
    warn: <IoIosWarning color="#EAB308" />,
    danger: <FaBan color="#DC2626" />,
  };

  if (!isOpen || !toast) return null;

  const pointColor = pointColorMap[toast.type];
  const icon = iconMap[toast.type];

  return (
    <div className="animate-fadeIn fixed left-1/2 top-45 z-50 w-max min-w-fit -translate-x-1/2 rounded-8 border border-solid border-gray-300">
      <div className="flex min-h-40 items-center rounded-8 border-solid bg-white md:min-h-50">
        <span
          className={`min-h-40 w-5 shrink-0 rounded-l-lg md:min-h-50 ${pointColor}`}
        />
        <div className="px-10 md:px-20">{icon}</div>
        <p className="min-w-fit pr-20 text-center text-12 font-medium leading-5 text-gray-800 md:text-16">
          {toast.content}
        </p>
      </div>
    </div>
  );
}
