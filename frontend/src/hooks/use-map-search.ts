import { Dispatch, SetStateAction, useEffect, useState } from "react";

type SearchResultType = {
  placeName: string;
  category: string;
  address: string;
  lat: number;
  lng: number;
  id: string;
};

const useMapSearch = (): [
  string,
  Dispatch<SetStateAction<string>>,
  SearchResultType[],
] => {
  const [inputValue, setInputValue] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResultType[]>([]);
  const [debounce, setDebounce] = useState("");

  useEffect(() => {
    if (debounce === "") {
      setSearchResults([]);
      return;
    }
    const ps = new kakao.maps.services.Places();
    const searchPlaces = () => {
      ps.keywordSearch(debounce, (data) => {
        if (!data) setSearchResults([]);
        setSearchResults(() =>
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
    };
    searchPlaces();
  }, [debounce]);

  useEffect(() => {
    setTimeout(() => {
      setDebounce(inputValue);
    }, 500);
  }, [inputValue]);

  return [inputValue, setInputValue, searchResults];
};

export default useMapSearch;
