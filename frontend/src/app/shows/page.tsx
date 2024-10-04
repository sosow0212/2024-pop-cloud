import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Suspense } from "react";

import fetchShows from "@/api/get-shows";

import SearchInput from "./_components/search-input";
import ShowList from "./_components/show-lists";

export default async function PopupListPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["shows", searchParams],
    queryFn: () => fetchShows(searchParams),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="grow p-4">
        <h1 className="mb-4 text-24-700">팝업 스토어 목록</h1>
        <SearchInput />
        <Suspense fallback={<div>Loading...</div>}>
          <ShowList searchParams={searchParams} />
        </Suspense>
      </div>
    </HydrationBoundary>
  );
}
