import { Search } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import { SearchResultType } from "@/hooks/use-map-search";

interface MapSearchProps {
  onChangeValue: (lat: number, lng: number, withCurrent: boolean) => void;
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  results: SearchResultType[];
}

export default function MapSearch({
  onChangeValue,
  inputValue,
  results,
  setInputValue,
}: MapSearchProps) {
  const [inputOpen, setInputOpen] = useState(false);
  return (
    <div
      className={`relative flex  transition-all ${inputOpen ? "w-full" : "w-24"}`}
    >
      <input
        className="peer w-full rounded-md border object-left py-2 pl-30"
        placeholder="키워드로 장소 지정"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Search
        onClick={() => setInputOpen((p) => !p)}
        className="absolute left-4 top-1/2 size-24 -translate-y-1/2 cursor-pointer rounded-md  "
      />

      <ul
        className={`absolute inset-x-0 top-full z-50 hidden max-h-300 divide-y overflow-y-auto rounded-md border-black bg-white shadow-sm peer-focus:block ${results.length && "border"}`}
      >
        {results?.map((result) => (
          <li key={result.id} className="px-10 py-5">
            <button
              type="button"
              className="my-5 cursor-pointer text-18 font-extrabold underline-offset-4 hover:underline"
              onMouseDown={(e) => {
                e.preventDefault();
                onChangeValue(result.lat, result.lng, true);
                setInputValue("");
              }}
            >
              {result.placeName}
            </button>
            <p className="text-14 text-slate-400">{result.category}</p>
            <span className="text-14 text-slate-500">{result.address}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
