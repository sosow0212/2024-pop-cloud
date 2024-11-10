"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { fetchShows } from "@/api/get-shows";

import { ShowData } from "../types/index";

interface ShowsResponse {
  shows: ShowData[];
  nextCursor: string | null;
}

export default function useShowList(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  return useInfiniteQuery<ShowsResponse, Error>({
    queryKey: ["shows", searchParams],
    queryFn: ({ pageParam }) =>
      fetchShows({ ...searchParams, showId: pageParam as string | null }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null as string | null,
  });
}
