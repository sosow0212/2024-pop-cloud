import { useState } from "react";

import cn from "@/components/ui/cn";
import { useMapSearch } from "@/hooks";
import { useIsMobileStore, useModalStore } from "@/store";

import { DesktopButton, MobileButton } from "./map-openButton";
import MapRecommendation from "./map-recommendation";
import MapSearch from "./map-search";
import MapSideItem from "./map-side-item";

interface MapSidebarProps {
  mapInfo: MapInfoType;
  changeCenterPosition: (
    lat: number,
    lng: number,
    withCurrent: boolean,
  ) => void;
  clickedMarkerId: number;
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
    ? "bottom-0 left-0 h-300 w-full"
    : "top-0 left-0 md:h-screen h-[calc(100vh-110px)]";

  let transformClasses = "";
  if (isMobile) {
    transformClasses = sideOpen ? "translate-y-0" : "translate-y-full";
  } else {
    transformClasses = sideOpen ? "translate-x-0" : "-translate-x-full";
  }

  return (
    <nav
      className={cn(
        `absolute z-10 bg-white transition-all min-w-340`,
        mobileClasses,
        transformClasses,
      )}
    >
      {isMobile ? (
        <MobileButton isOpen={sideOpen} setIsOpen={setSideOpen} />
      ) : (
        <DesktopButton isOpen={sideOpen} setIsOpen={setSideOpen} />
      )}
      <article
        className={`relative flex h-full flex-col overflow-y-auto ${isMobile && "rounded-t-xl"}`}
      >
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
              changeCenterPosition={changeCenterPosition}
            />
          ))}
          {mapInfo.markers.map((marker) => (
            <MapSideItem
              key={marker.id}
              clickedMarkerId={clickedMarkerId}
              marker={marker}
              changeCenterPosition={changeCenterPosition}
            />
          ))}
          {mapInfo.markers.map((marker) => (
            <MapSideItem
              key={marker.id}
              clickedMarkerId={clickedMarkerId}
              marker={marker}
              changeCenterPosition={changeCenterPosition}
            />
          ))}
        </ul>
      </article>
    </nav>
  );
}
