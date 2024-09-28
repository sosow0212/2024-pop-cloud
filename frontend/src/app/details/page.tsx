"use client";

import { AiFillHome } from "react-icons/ai";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCar, FaUtensils, FaWifi } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { IoPricetagSharp, IoShareSocial } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";

import CarouselUI from "@/components/common/carousel";
import LikeButton from "@/components/common/like-button";
import DetailsTabs from "@/components/details-page/details-tabs";

const popupMock: Popup = {
  id: 9,
  ownerId: 9,
  title: "코뿔소와 함께하는 잠수교 러닝중 아이스크림",
  description:
    "아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회아메리카노: 빨리 잠들기 대회",
  startDate: "2024-08-02T19:42:19.379718",
  endDate: "2024-08-02T19:32:19.379718",
  openTimes: "평일 09:00 ~ 18:00,\n주말 12:00 ~ 21:00\n",
  location: "잠수교",
  latitude: 37.556725,
  longitude: 126.9234952,
  isParkingAvailable: false,
  isFoodAllowed: false,
  isKidsZone: false,
  isWifiAvailable: false,
  fee: 0,
  publicTag: "전시",
  visitCount: 0,
  likedCount: 0,
  tags: ["가족", "데이트"],
  images: ["/images/mock.jpeg", "/images/mock2.jpeg", "/images/mock3.jpeg"],
};

export type Popup = {
  id: number;
  ownerId: number;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  openTimes: string;
  location: string;
  latitude: number;
  longitude: number;
  isParkingAvailable: boolean;
  isFoodAllowed: boolean;
  isKidsZone: boolean;
  isWifiAvailable: boolean;
  fee: number;
  publicTag: string;
  visitCount: number;
  likedCount: number;
  tags: string[];
  images: string[];
};
const PUBLIC_CN = "size-25 md:size-30";
const DETAIL_INFO_BOOLEAN = [
  {
    title: "주차",
    info: popupMock.isParkingAvailable,
    iconTrue: <FaCar className={PUBLIC_CN} />,
  },
  {
    title: "키즈존",
    info: popupMock.isKidsZone,
    iconTrue: <MdChildCare className={PUBLIC_CN} />,
  },
  {
    title: "음식반입",
    info: popupMock.isFoodAllowed,
    iconTrue: <FaUtensils className={PUBLIC_CN} />,
  },
  {
    title: "와이파이",
    info: popupMock.isWifiAvailable,
    iconTrue: <FaWifi className={PUBLIC_CN} />,
  },
];

export default function PopupDetails() {
  return (
    <div>
      <div className="my-40 flex items-center gap-12">
        <AiFillHome size={20} />
        <IoIosArrowForward size={20} />
        <span className="text-16-600">팝업</span>
      </div>
      <section className=" w-full text-center">
        <span className="mb-14 block w-full text-16-700 ">
          {popupMock.publicTag}
        </span>
        <h2 className="line-clamp-1 text-32-600">{popupMock.title}</h2>
        <div className="my-40 flex justify-center gap-16">
          <span className="relative size-40 rounded-full bg-[#555555]/70">
            <LikeButton className="center" color="text-white" size={24} />
          </span>
          <span className="relative size-40 rounded-full bg-[#555555]/70">
            <IoShareSocial
              className="center size-20 cursor-pointer text-white"
              onClick={() => {}}
            />
          </span>
        </div>
      </section>

      <hr className="mb-40 h-1 w-full bg-gray-200" />

      <CarouselUI
        data={popupMock.images}
        className="h-240 w-full md:h-420 md:w-700 lg:h-460"
      />

      <DetailsTabs data={popupMock} />
      <hr className="mb-40 h-1 w-full bg-gray-200" />

      <section className="flex justify-evenly">
        {DETAIL_INFO_BOOLEAN.map(({ title, info, iconTrue }) => (
          <dl className="flex w-63 flex-col items-center gap-12" key={title}>
            <dt className="text-18-700">{title}</dt>
            <dd className="mt-8 text-16">
              {info ? (
                iconTrue
              ) : (
                <span className="relative">
                  {iconTrue}
                  <CiNoWaitingSign className="absolute -left-13 -top-12 size-50 md:-left-13 md:-top-12 md:size-55" />
                </span>
              )}
            </dd>
            <span className="sr-only">{info ? "이용 가능" : "이용 불가"}</span>
          </dl>
        ))}
      </section>

      <hr className="my-40 h-1 w-full bg-gray-200" />

      <section>
        <span className="flex gap-8 text-18-700">
          <IoPricetagSharp />
          연관태그
        </span>
        <div className="mt-14 flex gap-10">
          {popupMock.tags.map((tag) => (
            <button type="button" key={tag}>
              # {tag}
            </button>
          ))}
        </div>
      </section>

      <hr className="my-40 h-1 w-full bg-gray-200" />
      <section className="mb-40">
        <h3 className="text-24-600">연관 추천 팝업</h3>
      </section>
    </div>
  );
}
