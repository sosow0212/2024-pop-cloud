import { ShowData } from "@/app/shows/types/index";

function getDefaultDateRange(): { startDate: string; endDate: string } {
  return {
    startDate: "2024-01-01",
    endDate: "2024-12-31",
  };
}

export default async function fetchShows(params: {
  [key: string]: string | string[] | undefined;
}): Promise<ShowData[]> {
  const defaultDateRange = getDefaultDateRange();
  const searchParams = new URLSearchParams();

  searchParams.set("startDate", defaultDateRange.startDate);
  searchParams.set("endDate", defaultDateRange.endDate);
  searchParams.set("showType", "popups");
  searchParams.set("pageSize", "10");

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else if (value !== undefined) {
      searchParams.set(key, value);
    }
  });

  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shows`);
  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
