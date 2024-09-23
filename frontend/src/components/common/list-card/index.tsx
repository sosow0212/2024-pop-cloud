/* eslint-disable no-console */
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaMapMarkerAlt } from "react-icons/fa";
import LikeButton from "../like-button/index";

interface EventData {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  image: string;
}

interface EventCardProps {
  event: EventData;
  onLikeChange?: (isLiked: boolean) => void;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function EventCard({ event, onLikeChange }: EventCardProps) {
  const handleLikeChange = (isLiked: boolean) => {
    console.log(
      `이벤트 ${event.id}가 ${isLiked ? "좋아요" : "좋아요 취소"}되었습니다.`,
    );
    if (onLikeChange) {
      onLikeChange(isLiked);
    }
  };

  const handleLikeButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/events/${event.id}`} passHref>
      <article className="flex h-145 w-full max-w-800 gap-10 overflow-hidden rounded-lg border border-gray-200 bg-white text-black shadow-md shadow-gray-600/20 transition-shadow hover:shadow-lg">
        <figure className="relative size-142 shrink-0">
          <div className="absolute inset-8 overflow-hidden rounded-lg">
            <Image
              src={event.image}
              alt={`${event.title} 이미지`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        </figure>
        <div className="flex grow flex-col justify-between p-8">
          <div>
            <div className="mb-1 flex items-start justify-between">
              <h2 className="mb-5 truncate text-16-700">{event.title}</h2>
              <button
                type="button"
                onClick={handleLikeButtonClick}
                aria-label={`이벤트 ${event.title} 좋아요`}
              >
                <LikeButton onChange={handleLikeChange} />
              </button>
            </div>
            <address className="flex items-center text-12-600 not-italic text-gray-500">
              <FaMapMarkerAlt className="mr-1" size={12} />
              {event.location}
            </address>
          </div>
          <div className="text-right text-14-700 text-black">
            <time dateTime={event.startDate}>
              {formatDate(event.startDate)}
            </time>
            {" - "}
            <time dateTime={event.endDate}>{formatDate(event.endDate)}</time>
          </div>
        </div>
      </article>
    </Link>
  );
}
