"use client";

import React, { useCallback, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useInView } from "react-intersection-observer";

import EventCard from "@/components/common/list-card";

import useShowList from "../hooks/use-shows-list";
import { ShowData } from "../types/index";
import CustomSpinner from "./spinner";

export default function ShowList({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}): React.ReactElement {
  const { ref, inView } = useInView();

  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useShowList(searchParams);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage, isFetchingNextPage]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleLikeChange = (id: number, isLiked: boolean): void => {
    console.log(`Show ${id} like status changed to: ${isLiked}`); //eslint-disable-line
  };

  function renderFooter(): React.ReactNode {
    if (isFetchingNextPage) {
      return <CustomSpinner />;
    }
    if (!hasNextPage) {
      return (
        <div className="mb-13 flex items-center justify-center py-8">
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center p-13 text-16-700 text-neutral-900 transition duration-300 ease-in-out "
          >
            <FaArrowUp className="mr-8 size-15" />맨 위로 가기
          </button>
        </div>
      );
    }
    return null;
  }

  if (isLoading) return <CustomSpinner />;
  if (error)
    return (
      <div className="py-8 text-center text-red-500">
        Failed to load shows. Please try again later.
      </div>
    );

  const allShows = data?.pages.flatMap((page) => page.shows) || [];

  if (allShows.length === 0) {
    return (
      <div className="py-8 text-center text-gray-500">No shows available.</div>
    );
  }

  return (
    <div className="space-y-8">
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
      <div ref={ref}>{renderFooter()}</div>
    </div>
  );
}
