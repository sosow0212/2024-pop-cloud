import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import fetchShows from "@/api/get-shows";

import SearchInput from "./_components/search-input";
import ShowList from "./_components/show-lists";

export default async function ShowListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = new QueryClient();

  // 기본 파라미터 설정 및 누락된 파라미터 확인
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), 0);

  const defaultParams = {
    startDate: startOfMonth.toISOString().split("T")[0], // 이번 달 1일
    endDate: oneYearLater.toISOString().split("T")[0], // 1년 후 같은 달의 마지막 날
    showType: "popups",
    pageSize: "10",
  };

  const newSearchParams = new URLSearchParams(
    searchParams as Record<string, string>,
  );
  let needsRedirect = false;

  Object.entries(defaultParams).forEach(([key, value]) => {
    if (!searchParams[key]) {
      newSearchParams.set(key, value);
      needsRedirect = true;
    }
  });

  // 누락된 파라미터가 있으면 리다이렉트
  if (needsRedirect) {
    redirect(`/shows?${newSearchParams.toString()}`);
  }

  await queryClient.prefetchQuery({
    queryKey: ["shows", searchParams],
    queryFn: () => fetchShows(searchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grow p-4">
        <h1 className="mb-4 text-24-700">쇼케이스 목록</h1>
        <SearchInput />
        <Suspense fallback={<div>Loading...</div>}>
          <ShowList searchParams={searchParams} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
