import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import fetchShows from "@/api/get-shows";

import FilterContainer from "./_components/filter-container";
import SearchInput from "./_components/search-input";
import SelectedTags from "./_components/selected-tags";
import ShowList from "./_components/show-lists";
import ShowTypeFilter from "./_components/shows-type-filter";

export default async function ShowListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = new QueryClient();

  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const oneYearLater = new Date(today.getFullYear() + 1, today.getMonth(), 0);

  const defaultParams = {
    startDate: startOfMonth.toISOString().split("T")[0],
    endDate: oneYearLater.toISOString().split("T")[0],
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
    <div className="flex">
      <FilterContainer />
      <div className="min-h-screen w-full lg:ml-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <div className="flex h-full flex-col overflow-hidden p-30 pt-40 lg:px-70 lg:pt-50">
            <h1 className="mb-4 text-24-700">쇼케이스 목록</h1>
            <div className="my-20 flex h-150 min-w-330 items-center justify-between rounded-lg bg-gray-100 p-20 md:gap-50 lg:gap-30">
              <p className="text-16-600">
                팝클라우드에 팝업스토어를 등록하고 싶으신가요?
                <br />
                팝업스토어를 소개해보세요.
              </p>
              <Link
                href="/add-shows"
                className="ml-15 flex h-50 w-120 items-center justify-center rounded bg-black px-10 py-2 text-center text-white sm:ml-15 sm:w-160"
              >
                공간 등록
              </Link>
            </div>
            <SearchInput initialValue={searchParams.title as string} />
            <div className="my-4 flex flex-wrap items-center">
              <ShowTypeFilter />
              <div className="ml-4 flex flex-wrap items-center">
                <SelectedTags />
              </div>
            </div>
            <div className="grow overflow-hidden">
              <Suspense fallback={<div>Loading...</div>}>
                <ShowList searchParams={searchParams} />
              </Suspense>
            </div>
          </div>
        </HydrationBoundary>
      </div>
    </div>
  );
}
