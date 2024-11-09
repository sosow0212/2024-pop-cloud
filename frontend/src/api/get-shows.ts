/*eslint-disable */

import { ShowData } from "@/app/shows/types/index";
import { ApiError } from "@/custom-error";

import instance from "./custom-fetch";
import { RelativeShow, Show } from "@pop-cloud-types";
import { defaultParams } from "@/constants/shows";

type FetchShowsParams = {
  [key: string]: string | string[] | undefined | null;
};

export async function fetchShows(
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

// 상세페이지의 show 정보를 불러오는 api 함수입니다.
export async function getShowsDetails(popupId: number): Promise<Show> {
  const { data } = await instance.get<Show>(`/api/popups/${popupId}`);
  return data;
}

// 상세페이지에서 연관 전시 정보를 불러오는 api 함수입니다.
export async function getRelativeShows(
  publicTags: string,
  showType: "popups" | "exhibition" = defaultParams.showType,
): Promise<RelativeShow[]> {
  const { data } = await instance.get<RelativeShow[]>(
    `/api/shows?showType=${showType}&publicTags=${[publicTags]}&startDate=${defaultParams.startDate}&endDate=${defaultParams.endDate}&pageSize=${defaultParams.pageSize}`,
  );

  return data;
}
