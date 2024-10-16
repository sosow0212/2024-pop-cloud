import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

export type SearchResultType = {
  placeName: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  id: string;
};

type KakaoPlacesSearchResult = {
  id: string;
  place_name: string;
  category_group_name: string;
  address_name: string;
  y: string;
  x: string;
};

const useMapSearch = (): [
  string,
  Dispatch<SetStateAction<string>>,
  SearchResultType[],
] => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const searchPlaces = useCallback((keyword: string) => {
    if (keyword === "") {
      setSearchResults([]);
      return;
    }

    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data: KakaoPlacesSearchResult[] | null) => {
      if (!data) {
        setSearchResults([]);
        return;
      }

      setSearchResults(
        data.slice(0, 5).map((d) => ({
          id: d.id,
          placeName: d.place_name,
          category: d.category_group_name,
          address: d.address_name,
          lat: +d.y,
          lng: +d.x,
        })),
      );
    });
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      searchPlaces(inputValue);
    }, 500);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [inputValue, searchPlaces]);

  return [inputValue, setInputValue, searchResults];
};

export default useMapSearch;
