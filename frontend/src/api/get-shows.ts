/*eslint-disable */

import { ShowData } from "@/app/shows/types/index";
import { ApiError } from "@/custom-error";

import instance from "./custom-fetch";

type FetchShowsParams = {
  [key: string]: string | string[] | undefined | null;
};

export default async function fetchShows(
  params: FetchShowsParams,
): Promise<{ shows: ShowData[]; nextCursor: string | null }> {
  const searchParams = new URLSearchParams();

  if (!params.startDate || !params.endDate) {
    throw new Error("startDate and endDate are required parameters");
  }

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else if (value !== undefined && value !== null) {
      searchParams.set(key, value.toString());
    }
  });

  if (!searchParams.has("showType")) searchParams.set("showType", "popups");
  if (!searchParams.has("pageSize")) searchParams.set("pageSize", "10");

  try {
    const { data } = await instance.get<ShowData[]>(
      `/api/shows?${searchParams.toString()}`,
    );

    if (!Array.isArray(data)) {
      return { shows: [], nextCursor: null };
    }

    let shows = data;

    // Filter shows based on title if provided
    if (params.title) {
      shows = shows.filter((show) =>
        show.title
          .toLowerCase()
          .includes(params.title!.toString().toLowerCase()),
      );
    }

    const nextCursor =
      shows.length > 0 ? shows[shows.length - 1].showId.toString() : null;

    return { shows, nextCursor };
  } catch (error) {
    if (error instanceof ApiError) {
      //TODO - 에러처리 추가
      console.error(`API Error: ${error.message}, Status: ${error.status}`);
    } else {
      console.error("An unexpected error occurred:", error);
    }
    throw error;
  }
}
