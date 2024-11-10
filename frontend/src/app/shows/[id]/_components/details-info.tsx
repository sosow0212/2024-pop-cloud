import { DetailsProps } from "@pop-cloud-types";
import { CiNoWaitingSign } from "react-icons/ci";
import { FaCar, FaWifi } from "react-icons/fa";
import { FaDog } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdChildCare } from "react-icons/md";

export default function DetailsInfo({ data }: DetailsProps) {
  const PUBLIC_CN = "size-20 md:size-26 text-gray-90";

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
    <section className="flex justify-evenly">
      {DETAIL_INFO_BOOLEAN.map(({ able, disable, info, icon }) => (
        <dl className="flex w-53 flex-col items-center pt-10" key={able}>
          <dd className="mb-16 text-16">
            {info ? (
              icon
            ) : (
              <span className="relative">
                {icon}
                <CiNoWaitingSign className="absolute -left-12 -top-11 size-43 text-gray-100 md:-left-10 md:-top-10 md:size-46" />
              </span>
            )}
          </dd>
          <dt className="md:text-12-700 break-words text-center text-11 font-bold text-gray-100/80">
            {info ? able : disable}
          </dt>
        </dl>
      ))}
    </section>
  );
}
