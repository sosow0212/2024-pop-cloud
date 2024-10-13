import { ShowData } from "@/app/shows/types/index";

export default async function fetchShows(params: {
  [key: string]: string | string[] | undefined;
}): Promise<ShowData[]> {
  const searchParams = new URLSearchParams();

  // 필수 파라미터 설정
  if (!params.startDate || !params.endDate) {
    throw new Error("startDate and endDate are required parameters");
  }

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((v) => searchParams.append(key, v));
    } else if (value !== undefined) {
      searchParams.set(key, value);
    }
  });

  // 기본값 설정
  if (!searchParams.has("showType")) searchParams.set("showType", "popups");
  if (!searchParams.has("pageSize")) searchParams.set("pageSize", "10");

  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/shows`);
  url.search = searchParams.toString();

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
