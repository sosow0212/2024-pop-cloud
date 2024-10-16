import { Menu, X } from "lucide-react";
import { useState } from "react";

import EventCard from "@/components/common/list-card";
import cn from "@/components/ui/cn";
import { useMapSearch } from "@/hooks";
import { useIsMobileStore, useModalStore } from "@/store";

import MapRecommendation from "./map-recommendation";
import MapSearch from "./map-search";

interface MapSidebarProps {
  mapInfo: MapInfoType;
  changeCenterPosition: (lat: number, lng: number) => void;
}

export default function MapSidebar({
  mapInfo,
  changeCenterPosition,
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
    ? "bottom-0 left-0 h-[50vh] w-full"
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
      <button
        className={cn(
          "absolute z-50 bg-black text-white rounded-full p-4",
          isMobile
            ? "top-0 right-10 -translate-y-[110%]"
            : "right-0 top-10 translate-x-[110%]",
        )}
        type="button"
        onClick={() => setSideOpen((p) => !p)}
      >
        {sideOpen ? <X /> : <Menu />}
      </button>
      <article className="h-full overflow-y-auto">
        <header className="flex items-center gap-x-20 bg-black px-20 py-10">
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
            <li key={marker.id} className="border px-20 py-10">
              <EventCard
                event={{
                  id: marker.id,
                  startDate: marker.startDate,
                  endDate: marker.endDate,
                  image: "/images/luffi.jpg",
                  location: marker.position.location,
                  title: marker.title,
                }}
              />
            </li>
          ))}
        </ul>
      </article>
    </nav>
  );
}
