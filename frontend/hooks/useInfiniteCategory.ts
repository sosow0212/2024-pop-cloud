import qs from "query-string";

import { useInfiniteQuery } from "@tanstack/react-query";

const ENDDATA = {
  popup: {
    endPoint: "/api/popups",
    id: "popupsId",
  },
  exhibition: {
    endPoint: "/api/exhibitions",
    id: "exhibitionsId",
  },
};

const useInfiniteCategory = ({
  category,
  searchDate,
  searchRegions,
  searchTags,
}: {
  category: "popup" | "exhibition";
  searchDate: ISearchDate;
  searchRegions: ISearchRegion[];
  searchTags: IPublicTag[];
}) => {
  const getCategoryList = async (
    lastContentId: number | undefined = undefined,
  ) => {
    try {
      // /api/popups?popupsId=${value}&pageSize=${value}
      const SIZE = 12;
      const { startDate, endDate } = searchDate;
      const { endPoint, id } = ENDDATA[category];
      const url = qs.stringifyUrl(
        {
          url: endPoint,
          query: {
            [id]: lastContentId,
            pageSize: SIZE,
            startDate: startDate.getTime(),
            endDate: endDate.getTime(),
            regions: searchRegions,
            tags: searchTags,
          },
        },
        {
          skipNull: true,
        },
      );

      const res = await fetch("/api/aaa");
      if (res.ok) {
        const data = await res.json();
        return data;
      }
      throw new Error("internall error");
    } catch (error) {
      return error as Error;
    }
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: [category, searchDate, searchRegions, searchTags],
      queryFn: ({ pageParam }) => getCategoryList(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage?.nextCursor,
    });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};

export default useInfiniteCategory;
