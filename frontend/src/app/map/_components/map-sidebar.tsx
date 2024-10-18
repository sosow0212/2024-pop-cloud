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

const mobileClasses = (isMobile: boolean) =>
  isMobile
    ? "bottom-0 left-0 h-300 w-full"
    : "top-0 left-0 md:h-screen h-[calc(100vh-110px)]";

// const transformClasses = (isMobile: boolean, sideOpen: boolean) => {
//   if (isMobile) {
//     return sideOpen ? "translate-y-0" : "translate-y-250";
//   }
//   return sideOpen ? "translate-x-0" : "-translate-x-full";
// };

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
      const baseTransform = `translateY(${translateY}px)`;

      return sideOpen ? baseTransform : `translateY(250px)`;
    }
    return sideOpen ? "translateX(0)" : "translateX(-100%)";
  };

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
        </ul>
      </article>
    </nav>
  );
}

// import { useRef, useState } from "react";

// import cn from "@/components/ui/cn";
// import { useMapSearch } from "@/hooks";
// import { useIsMobileStore, useModalStore } from "@/store";

// import MapRecommendation from "./map-recommendation";
// import MapSearch from "./map-search";
// import MapSideButton from "./map-side-button";
// import MapSideItem from "./map-side-item";

// interface MapSidebarProps {
//   mapInfo: MapInfoType;
//   changeCenterPosition: (
//     lat: number,
//     lng: number,
//     withCurrent: boolean,
//   ) => void;
//   clickedMarkerId: number;
// }

// const mobileClasses = (isMobile: boolean) =>
//   isMobile
//     ? "bottom-0 left-0 h-300 w-full"
//     : "top-0 left-0 md:h-screen h-[calc(100vh-110px)]";

// const transformClasses = (isMobile: boolean, sideOpen: boolean) => {
//   if (isMobile) {
//     return sideOpen ? "translate-y-0" : "translate-y-full";
//   }
//   return sideOpen ? "translate-x-0" : "-translate-x-full";
// };

// const transformStyles = (
//   isMobile: boolean,
//   sideOpen: boolean,
//   isDragging: boolean,
//   y?: number,
// ) => {
//   if (isMobile && sideOpen && isDragging) {
//     return `translateY(${y})`;
//   }
//   return undefined;
// };

// export default function MapSidebar({
//   mapInfo,
//   changeCenterPosition,
//   clickedMarkerId,
// }: MapSidebarProps) {
//   const isMobile = useIsMobileStore();
//   const [sideOpen, setSideOpen] = useState(true);
//   const { onOpen, onSetData } = useModalStore();
//   const [inputValue, setInputValue, results] = useMapSearch();
//   const [recommendationRoutine, setRecommendationRoutine] = useState<
//     RecommendationResponse[]
//   >([]);

//   const [translateY, setTranslateY] = useState(0);
//   const [startY, setStartY] = useState(0);
//   const [isDragging, setIsDragging] = useState(false);
//   const navRef = useRef<HTMLElement>(null);

//   const openRecommendationModal = () => {
//     onOpen("recommendation");
//     onSetData("places", mapInfo.markers);
//     onSetData("currentPosition", mapInfo.currentPosition);
//     onSetData("onSuccess", setRecommendationRoutine);
//   };

//   const handleTouchStart = (e: React.TouchEvent) => {
//     setStartY(e.touches[0].clientY);
//     setIsDragging(true);
//   };

//   const handleTouchMove = (e: React.TouchEvent) => {
//     if (!isDragging) return;
//     const currentY = e.touches[0].clientY;
//     const diff = startY - currentY;
//     if (Math.abs(diff) > 200) return;
//     setTranslateY((prevTranslateY) => {
//       const newTranslateY = prevTranslateY + diff;
//       return Math.max(Math.min(newTranslateY, 0), -window.innerHeight + 100);
//     });
//     setStartY(currentY);
//   };

//   const handleTouchEnd = () => {
//     setIsDragging(false);
//   };

//   return (
//     <nav
//       ref={navRef}
//       className={cn(
//         `absolute z-10 bg-white transition-all min-w-340`,
//         mobileClasses(isMobile!),
//         transformClasses(isMobile!, sideOpen),
//       )}
//       style={{
//         transform: transformStyles(
//           isMobile || false,
//           sideOpen,
//           isDragging,
//           translateY,
//         ),
//       }}
//     >
//       <MapSideButton
//         isMobile={isMobile || false}
//         isOpen={sideOpen}
//         setIsOpen={setSideOpen}
//       />
//       <article
//         className={`relative flex h-full flex-col overflow-y-auto ${isMobile && "rounded-t-xl"}`}
//       >
//         <header className="sticky top-0 z-10 space-y-10 bg-black px-20 py-10">
//           {isMobile && (
//             <div
//               className="mx-auto h-3 w-250 rounded-lg bg-slate-500 transition-all hover:bg-slate-300"
//               onTouchStart={handleTouchStart}
//               onTouchMove={handleTouchMove}
//               onTouchEnd={handleTouchEnd}
//             />
//           )}
//           <div className="flex items-center gap-x-20">
//             <MapSearch
//               inputValue={inputValue}
//               onChangeValue={changeCenterPosition}
//               results={results}
//               setInputValue={setInputValue}
//             />

//             <button
//               type="button"
//               className="whitespace-nowrap rounded-md bg-slate-600 px-8 py-2 text-white hover:bg-slate-500"
//               onClick={openRecommendationModal}
//             >
//               추천 경로
//             </button>
//           </div>
//         </header>
//         <MapRecommendation recommendationRoutine={recommendationRoutine} />
//         <ul>
//           {mapInfo.markers.map((marker) => (
//             <MapSideItem
//               key={marker.id}
//               clickedMarkerId={clickedMarkerId}
//               marker={marker}
//               changeCenterPosition={changeCenterPosition}
//             />
//           ))}
//         </ul>
//       </article>
//     </nav>
//   );
// }
