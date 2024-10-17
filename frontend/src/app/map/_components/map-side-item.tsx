import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";

import { formatDate } from "@/components/common/list-card";

interface MapSideItemProps {
  marker: MarkerType;
  clickedMarkerId: number;
  changeCenterPosition: (
    lat: number,
    lng: number,
    withCurrent: boolean,
  ) => void;
}

export default function MapSideItem({
  clickedMarkerId,
  changeCenterPosition,
  marker: { id, title, endDate, position, startDate },
}: MapSideItemProps) {
  return (
    <li
      className={`flex h-100 w-full items-center border-b ${id === clickedMarkerId ? "bg-slate-200" : "bg-white"}`}
    >
      <figure className="relative h-110 w-100">
        <Image
          src="/images/luffi.jpg"
          alt={`${title} 이미지`}
          fill
          className="object-contain"
        />
      </figure>
      <div className="flex h-full grow flex-col justify-between px-10 py-15">
        <div className="flex flex-col space-y-2">
          <div className="flex items-start justify-between">
            <h2 className="mr-4 line-clamp-2 text-16-700" title={title}>
              {title}
            </h2>
          </div>
          <address className="flex items-center text-12-600 not-italic text-gray-500">
            <FaMapMarkerAlt className="mr-1 shrink-0" size={12} />
            <span className="truncate">{position.location}</span>
          </address>
        </div>
        <div className="flex items-center justify-between text-12-600">
          <div className="flex items-center gap-x-5 text-gray-700">
            <button
              className="underline-offset-2 hover:underline"
              type="button"
              onClick={() =>
                changeCenterPosition(
                  position.latitude.value,
                  position.longitude.value,
                  false,
                )
              }
            >
              위치
            </button>
            <Link
              className="underline-offset-2 hover:underline"
              href={`/popups/${id}`}
            >
              상세페이지
            </Link>
          </div>
          <div className="text-gray-500">
            <time dateTime={startDate}>{formatDate(startDate)}</time>
            {" - "}
            <time dateTime={endDate}>{formatDate(endDate)}</time>
          </div>
        </div>
      </div>
    </li>
  );
}
