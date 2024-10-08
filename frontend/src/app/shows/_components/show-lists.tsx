"use client";

import { useQuery } from "@tanstack/react-query";

import fetchShows from "@/api/get-shows";
import EventCard from "@/components/common/list-card";

import { ShowData } from "../types/index";

export default function ShowList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    data: shows,
    isLoading,
    error,
  } = useQuery<ShowData[]>({
    queryKey: ["shows", searchParams],
    queryFn: () => fetchShows(searchParams),
  });

  const handleLikeChange = (id: number, isLiked: boolean) => {
    console.log(`Show ${id} like status changed to: ${isLiked}`); // eslint-disable-line
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load shows. Please try again later.</div>;

  return shows && shows.length > 0 ? (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
      {shows.map((show) => (
        <EventCard
          key={show.showId}
          event={{
            ...show,
            images: show.images,
          }}
          onLikeChange={(isLiked) => handleLikeChange(show.showId, isLiked)}
        />
      ))}
    </div>
  ) : (
    <div>현재 표시할 쇼케이스가 없습니다.</div>
  );
}
