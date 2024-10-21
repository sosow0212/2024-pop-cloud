import { useEffect, useRef, useState } from "react";

import cn from "@/components/ui/cn";
import { useMapSearch } from "@/hooks";
import { useIsMobileStore, useModalStore } from "@/store";

import MapRecommendation from "./map-recommendation";
import MapSearch from "./map-search";
import MapSideButton from "./map-side-button";
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
type ContentType = "place" | "recommendation";
type ContentTypeArray = ContentType[];

const contentTypes: ContentTypeArray = ["place", "recommendation"];
const contetnKo = {
  place: "장소",
  recommendation: "추천경로",
};

const mobileClasses = (isMobile: boolean) =>
  isMobile
    ? "bottom-0 left-0 h-300 w-full"
    : "top-0 left-0 md:h-screen h-[calc(100vh-110px)]";

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
  const [content, setContent] = useState<ContentType>("place");

  const [translateY, setTranslateY] = useState(0);
  const [startY, setStartY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const dragRef = useRef<HTMLDivElement>(null);

  const openRecommendationModal = () => {
    onOpen("recommendation");
    onSetData("places", mapInfo.markers);
    onSetData("currentPosition", mapInfo.currentPosition);
    onSetData("onSuccess", setRecommendationRoutine);
  };

  const handleTouchStart = () => setIsDragging(true);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const currentY = e.touches[0].clientY;
    if (startY > currentY) return;
    if (currentY > startY + 200) return;

    setTranslateY(currentY - startY);
  };

  const handleTouchEnd = () => setIsDragging(false);

  useEffect(() => {
    if (dragRef.current) setStartY(dragRef.current.getBoundingClientRect().top);
  }, []);

  const getTransformStyle = () => {
    if (isMobile) {
      return sideOpen ? `translateY(${translateY}px)` : `translateY(250px)`;
    }
    return sideOpen ? "translateX(0)" : "translateX(-100%)";
  };

  useEffect(() => {
    if (recommendationRoutine.length) setContent("recommendation");
  }, [recommendationRoutine]);

  return (
    <nav
      ref={navRef}
      className={cn(
        `absolute z-10 bg-white transition-all min-w-340`,
        mobileClasses(isMobile!),
      )}
      style={{
        transform: getTransformStyle(),
      }}
    >
      <MapSideButton
        isMobile={isMobile || false}
        isOpen={sideOpen}
        setIsOpen={setSideOpen}
      />
      <article
        className={`relative flex h-full flex-col overflow-y-auto ${isMobile && "rounded-t-xl"}`}
      >
        <header className="sticky top-0 z-10 space-y-10 bg-black px-20 py-10">
          {isMobile && (
            <div
              ref={dragRef}
              className="mx-auto h-10 w-250 rounded-lg bg-slate-500 transition-all hover:bg-slate-300"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            />
          )}
          <div className="flex items-center gap-x-20">
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
          </div>
        </header>
        <div className="my-5 flex items-center gap-x-5 px-4">
          {contentTypes.map((c) => (
            <button
              className={`rounded-full px-10 py-5 text-14 ${content === c ? "bg-blue-5 text-white" : "border border-black bg-white text-black"}`}
              onClick={() => setContent(c)}
              type="button"
              key={c}
            >
              {contetnKo[c]}
            </button>
          ))}
        </div>
        {content === "recommendation" ? (
          <MapRecommendation
            recommendationRoutine={recommendationRoutine}
            openRecommendationModal={openRecommendationModal}
            clickedMarkerId={clickedMarkerId}
            changeCenterPosition={changeCenterPosition}
          />
        ) : (
          <ul>
            {mapInfo.markers.map((marker) => (
              <MapSideItem
                key={marker.id}
                clickedMarkerId={clickedMarkerId}
                marker={marker}
                changeCenterPosition={changeCenterPosition}
              />
            ))}
          </ul>
        )}
      </article>
    </nav>
  );
}
