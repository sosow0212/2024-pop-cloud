import { ShowData } from "@/app/shows/types/index";
import { ApiError } from "@/custom-error";

import instance from "./custom-fetch";

type FetchShowsParams = {
  [key: string]: string | string[] | undefined | null;
};

type ShowsResponse = {
  data: ShowData[];
  nextCursor: string | null;
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
    const { data } = await instance.get<ShowsResponse>(
      `/api/shows?${searchParams.toString()}`,
    );

    let shows = data.data;

    // Filter shows based on title if provided
    if (params.title) {
      shows = shows.filter((show) =>
        show.title
          .toLowerCase()
          .includes(params.title!.toString().toLowerCase()),
      );
    }

    const { nextCursor } = data;

    return { shows, nextCursor };
  } catch (error) {
    if (error instanceof ApiError) {
      /* TODO: 에러처리하기 */
      console.error(`API Error: ${error.message}, Status: ${error.status}`); // eslint-disable-line no-console
    }
    throw error;
  }
}
