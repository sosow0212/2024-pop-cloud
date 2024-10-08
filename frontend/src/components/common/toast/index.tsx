"use client";

import { FaBan, FaCheckCircle } from "react-icons/fa";
import { HiInformationCircle } from "react-icons/hi2";
import { IoIosClose, IoIosWarning } from "react-icons/io";

import useToastStore from "@/store/use-toast-store";

/**
 * Toast 컴포넌트는 알림 메시지를 화면에 표시하는 역할을 합니다.
 * 알림 유형(정보, 성공, 경고, 오류)에 따라 배경색과 아이콘이 달라집니다.
 * 상태 관리는 `useToastStore`에서 이루어지며, 열려 있으면 토스트가 화면에 표시됩니다.

 * 사용방법 : const { showToast } = useToastStore();

 * showToast({ type: "success", content: "메세지" });

 * type : info | success | warn | error

 * @returns {JSX.Element | null} - 열려 있는 경우에만 토스트 메시지를 렌더링하며, 그렇지 않으면 `null`을 반환합니다.
 * @author 조현지
 */

export default function Toast() {
  const { toast, isOpen, setIsOpen } = useToastStore();

  const pointColorMap = {
    info: "border-blue-500",
    success: "border-green-500",
    warn: "border-yellow-500",
    error: "border-red-500",
  };

  const iconMap = {
    info: <HiInformationCircle color="#339af0" size={20} />,
    success: <FaCheckCircle color="#51cf66" size={20} />,
    warn: <IoIosWarning color="#fcc419" size={22} />,
    error: <FaBan color="#ff6b6b" size={20} />,
  };

  if (!isOpen || !toast) return null;

  const pointColor = pointColorMap[toast.type];
  const icon = iconMap[toast.type];

  return (
    <div
      className={`fixed left-1/2 top-45 z-50 w-max min-w-fit -translate-x-1/2 animate-fadeIn rounded-lg border border-solid bg-white shadow-md shadow-gray-300 md:left-[calc(50%+35px)] lg:left-[calc(50%+123px)] ${pointColor}`}
    >
      <div className="flex items-center gap-10 px-10 py-6">
        <div className="p-10">{icon}</div>
        <p className="min-w-100 max-w-210 pr-10 text-13 md:text-15">
          {toast.content}
        </p>
        <IoIosClose
          className="size-25 cursor-pointer text-gray-500"
          onClick={() => setIsOpen(false)}
        />
      </div>
    </div>
  );
}
