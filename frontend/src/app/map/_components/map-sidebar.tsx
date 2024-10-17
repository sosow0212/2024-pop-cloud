import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
} from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

import cn from "@/components/ui/cn";
import { useMapSearch } from "@/hooks";
import { useIsMobileStore, useModalStore } from "@/store";

import MapRecommendation from "./map-recommendation";
import MapSearch from "./map-search";
import MapSideItem from "./map-side-item";

interface MapSidebarProps {
  mapInfo: MapInfoType;
  changeCenterPosition: (lat: number, lng: number) => void;
  clickedMarkerId: number;
}
interface ButtonProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

function MobileButton({ isOpen, setIsOpen }: ButtonProps) {
  return (
    <button
      className={cn(
        "top-0 -translate-y-full left-1/2 -translate-x-1/2 rounded-t-lg bg-gray-200 border-gray-400 border border-b-0 hover:bg-gray-300 text-slate-500 absolute",
      )}
      type="button"
      onClick={() => setIsOpen((p) => !p)}
    >
      {isOpen ? (
        <ChevronDown className="h-20 w-60" />
      ) : (
        <ChevronUp className="h-20 w-60" />
      )}
    </button>
  );
}
function DesktopButton({ isOpen, setIsOpen }: ButtonProps) {
  return (
    <button
      className={cn(
        "rounded-r-lg bg-gray-100 hover:bg-gray-200 py-10 text-slate-500 absolute top-1/2 right-0 translate-x-full -translate-y-1/2 border-gray-400 border border-l-0",
      )}
      type="button"
      onClick={() => setIsOpen((p) => !p)}
    >
      {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
    </button>
  );
}

export default function MapSidebar({
  mapInfo,
  changeCenterPosition,
  clickedMarkerId,
}: MapSidebarProps) {
  const isMobile = useIsMobileStore();
  const [sideOpen, setSideOpen] = useState(true);
  const { onOpen, onSetData } = useModalStore();
  const [inputValue, setInputValue, results] = useMapSearch();
  const [recommendationRoutine, setRecommendationRoutine] = useState<
    RecommendationResponse[]
  >([]);

  const openRecommendationModal = () => {
    onOpen("recommendation");
    onSetData("places", mapInfo.markers);
    onSetData("currentPosition", mapInfo.currentPosition);
    onSetData("onSuccess", setRecommendationRoutine);
  };

  const mobileClasses = isMobile
    ? "bottom-0 left-0 h-[40vh] w-full"
    : "top-0 left-0 h-screen";

  let transformClasses = "";
  if (isMobile) {
    transformClasses = sideOpen ? "translate-y-0" : "translate-y-full";
  } else {
    transformClasses = sideOpen ? "translate-x-0" : "-translate-x-full";
  }

  return (
    <nav
      className={cn(
        `absolute z-10  bg-white transition-all`,
        mobileClasses,
        transformClasses,
      )}
    >
      {isMobile ? (
        <MobileButton isOpen={sideOpen} setIsOpen={setSideOpen} />
      ) : (
        <DesktopButton isOpen={sideOpen} setIsOpen={setSideOpen} />
      )}
      <article className="relative h-full overflow-y-auto">
        <header className="sticky top-0 z-10 flex items-center gap-x-20 bg-black px-20 py-10">
          <MapSearch
            inputValue={inputValue}
            onChangeValue={changeCenterPosition}
            results={results}
            setInputValue={setInputValue}
          />

          <button
            type="button"
            className="whitespace-nowrap rounded-md bg-slate-600 px-8 py-2 text-white hover:bg-slate-500"
            onClick={openRecommendationModal}
          >
            추천 경로
          </button>
        </header>
        <MapRecommendation recommendationRoutine={recommendationRoutine} />
        <ul>
          {mapInfo.markers.map((marker) => (
            <MapSideItem
              key={marker.id}
              clickedMarkerId={clickedMarkerId}
              marker={marker}
            />
          ))}
          {mapInfo.markers.map((marker) => (
            <MapSideItem
              key={marker.id + 100}
              clickedMarkerId={clickedMarkerId}
              marker={marker}
            />
          ))}
          {mapInfo.markers.map((marker) => (
            <MapSideItem
              key={marker.id + 200}
              clickedMarkerId={clickedMarkerId}
              marker={marker}
            />
          ))}
        </ul>
      </article>
    </nav>
  );
}
