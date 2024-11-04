/*eslint-disable*/

"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";

import LikeButton from "../like-button/index";

interface EventData {
  showId: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  images: string[];
  publicTag: string;
  showType: string;
  visitedCount: number;
  likedCount: number;
}

interface EventCardProps {
  event: EventData;
  onLikeChange?: (isLiked: boolean) => void;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function EventCard({ event, onLikeChange }: EventCardProps) {
  const handleLikeChange = (isLiked: boolean) => {
    onLikeChange?.(isLiked);
  };

  const handleLikeButtonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <Link href={`/shows/${event.showId}`} className="block">
      <article className="flex w-full max-w-1200 gap-10 overflow-hidden rounded-lg border border-gray-200 bg-white text-black shadow-md shadow-gray-600/20 transition-shadow hover:shadow-lg">
        <figure className="relative size-142 shrink-0">
          <div className="absolute inset-8 overflow-hidden rounded-lg">
            <Image
              src={event.images[0]}
              alt={`${event.title} 이미지`}
              fill
              className="object-cover"
            />
          </div>
        </figure>
        <div className="flex grow flex-col justify-between p-14">
          <div className="flex flex-col space-y-2">
            <div className="flex items-start justify-between">
              <h2
                className="mr-4 line-clamp-2 grow text-16-700"
                title={event.title}
              >
                {event.title}
              </h2>
              <div onClick={handleLikeButtonClick}>
                <LikeButton onChange={handleLikeChange} />
              </div>
            </div>
            <address className="flex items-center text-12-600 not-italic text-gray-500">
              <FaMapMarkerAlt className="mr-1 shrink-0" size={12} />
              <span className="truncate">{event.location}</span>
            </address>
          </div>
          <div className="mt-2 text-right text-14-700 text-black">
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
