/*eslint-disable*/
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

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["shows", searchParams],
    queryFn: ({ pageParam = undefined }) =>
      fetchShows({ ...searchParams, showId: pageParam as string | undefined }),
    initialPageParam: undefined,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex flex-col h-full overflow-hidden">
        <h1 className="mb-4 text-24-700">쇼케이스 목록</h1>
        <div className="my-20 flex h-150 min-w-330 items-center justify-between rounded-lg bg-gray-100 p-20 md:gap-50 lg:gap-30">
          <p className="text-16-600">
            팝클라우드에 팝업스토어를 등록하고 싶으신가요?
            <br />
            팝업스토어를 소개해보세요.
          </p>
          <button
            type="button"
            className="h-50 w-120 rounded bg-black px-10 py-2 text-white sm:ml-10 sm:w-160"
          >
            공간 등록
          </button>
        </div>
        <SearchInput />
        <div className="flex-grow overflow-hidden">
          <Suspense fallback={<div>Loading...</div>}>
            <ShowList searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </HydrationBoundary>
  );
}
