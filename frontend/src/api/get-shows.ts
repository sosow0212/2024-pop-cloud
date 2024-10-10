import { ShowData } from "@/app/shows/types/index";

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

  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shows`);
  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();

  if (!Array.isArray(data)) {
    return { shows: [], nextCursor: null };
  }

  const shows = data as ShowData[];
  const nextCursor =
    shows.length > 0 ? shows[shows.length - 1].showId.toString() : null;

  return { shows, nextCursor };
}
