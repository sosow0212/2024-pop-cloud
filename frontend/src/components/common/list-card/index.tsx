import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaRegHeart, FaHeart, FaMapMarkerAlt } from "react-icons/fa";

interface EventData {
  id: number;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  image: string;
}

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().slice(2);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${year}.${month}.${day}`;
};

export default function EventCard() {
  const [event, setEvent] = useState<EventData>();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const dummyEvent: EventData = {
      id: 1,
      title: "아보디저트 팝업스토어",
      location: "서울특별시 송파구",
      startDate: "2024-09-02T00:00:00",
      endDate: "2024-09-24T00:00:00",
      image: "/images/luffi.jpg",
    };
    setEvent(dummyEvent);
  }, []);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-145 w-full max-w-800 gap-10 overflow-hidden rounded-lg bg-white text-black">
      <div className="relative size-142 shrink-0">
        <div className="absolute inset-8 overflow-hidden rounded-lg">
          <Image
            src={event.image}
            alt={`${event.title} 이미지`}
            layout="fill"
            objectFit="cover"
          />
        </div>
      </div>
      <div className="flex grow flex-col justify-between p-8">
        <div>
          <div className="mb-1 flex items-start justify-between">
            <h2 className="mb-5 truncate text-16-700">{event.title}</h2>
            <button
              type="button"
              onClick={handleLikeClick}
              className="focus:outline-none"
            >
              {isLiked ? (
                <FaHeart className="shrink-0 text-red-500" size={20} />
              ) : (
                <FaRegHeart className="shrink-0 text-black" size={20} />
              )}
            </button>
          </div>
          <p className="flex items-center text-12-600 text-gray-500">
            <FaMapMarkerAlt className="mr-1" size={12} />
            {event.location}
          </p>
        </div>
        <div className="text-right text-14-700 text-black">
          {formatDate(event.startDate)} - {formatDate(event.endDate)}
        </div>
      </div>
    </div>
  );
}
