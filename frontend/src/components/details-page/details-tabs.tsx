import { format } from "date-fns";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCar, FaWifi } from "react-icons/fa";
import { FaDog } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Popup {
  data: {
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
    isPetAllowed: boolean;
    isKidsZone: boolean;
    isWifiAvailable: boolean;
    fee: number;
    publicTag: string;
    visitCount: number;
    likedCount: number;
    tags: string[];
    images: string[];
  };
}

export default function DetailsTabs({ data }: Popup) {
  const DETAIL_INFO = [
    {
      title: "행사기간",
      info: `${format(new Date(data.startDate), "yyyy. MM. dd")} - ${format(new Date(data.endDate), "yyyy. MM. dd")}`,
    },
    { title: "장소", info: data.location },
    { title: "이용시간", info: data.openTimes },
    { title: "이용요금", info: `${data.fee}원` },
    { title: "주소", info: data.location },
  ];
  const PUBLIC_CN = "size-20 md:size-26 text-gray-600";
  const DETAIL_INFO_BOOLEAN = [
    {
      able: "주차가능",
      disable: "주차불가",
      info: data.isParkingAvailable,
      icon: <FaCar className={PUBLIC_CN} />,
    },
    {
      able: "키즈존",
      disable: "노키즈존",
      info: data.isKidsZone,
      icon: <MdChildCare className={PUBLIC_CN} />,
    },
    {
      able: "식음료반입 가능",
      disable: "식음료반입 금지",
      info: data.isFoodAllowed,
      icon: <IoFastFoodOutline className={PUBLIC_CN} />,
    },
    {
      able: "와이파이 가능",
      disable: "와이파이 불가",
      info: data.isWifiAvailable,
      icon: <FaWifi className={PUBLIC_CN} />,
    },
    {
      able: "동물동반 가능",
      disable: "동물동반 불가",
      info: data.isPetAllowed,
      icon: <FaDog className={PUBLIC_CN} />,
    },
  ];

  return (
    <Tabs defaultValue="information" className="my-30 w-full">
      <TabsList>
        <TabsTrigger className="text-18" value="information">
          상세정보
        </TabsTrigger>
        <TabsTrigger className="text-18" value="review">
          후기
        </TabsTrigger>
      </TabsList>
      <TabsContent value="information">
        <section className="my-40">
          <article className="leading-16 mb-50 text-16 text-gray-600">
            {data.description}
          </article>

          {DETAIL_INFO.map(({ title, info }) => (
            <dl key={title}>
              <dt className="mt-20 text-16-600 text-gray-700">{title}</dt>
              <dd className="mt-8 text-15 text-gray-500">{info}</dd>
            </dl>
          ))}
        </section>

        <hr className="mb-30 h-1 w-full bg-gray-200" />

        <section className="flex justify-evenly">
          {DETAIL_INFO_BOOLEAN.map(({ able, disable, info, icon }) => (
            <dl className="flex w-53 flex-col items-center pt-10" key={able}>
              <dd className="mb-16 text-16">
                {info ? (
                  icon
                ) : (
                  <span className="relative">
                    {icon}
                    <CiNoWaitingSign className="absolute -left-12 -top-11 size-43 text-gray-600 md:-left-10 md:-top-10 md:size-46" />
                  </span>
                )}
              </dd>
              <dt className="text-center text-12-600 text-gray-600">
                {info ? able : disable}
              </dt>
            </dl>
          ))}
        </section>
      </TabsContent>
      <TabsContent className="h-100" value="review">
        후기가 존재하지 않습니다
      </TabsContent>
    </Tabs>
  );
}
