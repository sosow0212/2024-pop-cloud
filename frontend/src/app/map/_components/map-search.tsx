import { Dispatch, SetStateAction, useState } from "react";

import { SearchResultType } from "@/hooks/use-map-search";

interface MapSearchProps {
  onChangeValue: (lat: number, lng: number) => void;
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
    <div className="relative flex w-full max-w-lg justify-end">
      <input
        className={`peer rounded-md border object-left py-10 pl-5 pr-0 transition-all ${inputOpen ? "w-full" : "w-130"}`}
        placeholder="키워드로 장소 지정"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onClick={() => setInputOpen(true)}
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
                onChangeValue(result.lat, result.lng);
                setInputValue("");
                setInputOpen(false);
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
