"use client";

import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import fetchShows from "@/api/get-shows";
import EventCard from "@/components/common/list-card";

import { ShowData } from "../types/index";

export default function ShowList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["shows", searchParams],
    queryFn: ({ pageParam }) =>
      fetchShows({ ...searchParams, showId: pageParam as string | null }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const handleLikeChange = (id: number, isLiked: boolean) => {
    console.log(`Show ${id} like status changed to: ${isLiked}`); //eslint-disable-line
  };

  const renderLoadMoreButton = () => {
    if (isFetchingNextPage) {
      return "Loading more...";
    }
    if (hasNextPage) {
      return "Load More";
    }
    return "No more shows";
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Failed to load shows. Please try again later.</div>;

  const allShows = data?.pages.flatMap((page) => page.shows) || [];

  if (allShows.length === 0) {
    return <div>No shows available.</div>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {allShows.map((show: ShowData) => (
          <EventCard
            key={show.showId}
            event={{
              ...show,
              images: Array.isArray(show.images) ? show.images : [],
            }}
            onLikeChange={(isLiked) => handleLikeChange(show.showId, isLiked)}
          />
        ))}
      </div>
      <div ref={ref}>{renderLoadMoreButton()}</div>
    </>
  );
}
