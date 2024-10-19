import React, { useEffect, useRef } from "react";

import MapSideItem from "./map-side-item";

interface MapRecommendationProps {
  recommendationRoutine: RecommendationResponse[];
  openRecommendationModal: () => void;
  clickedMarkerId: number;
  changeCenterPosition: (
    lat: number,
    lng: number,
    withCurrent: boolean,
  ) => void;
}

export default function MapRecommendation({
  recommendationRoutine = [],
  openRecommendationModal,
  changeCenterPosition,
  clickedMarkerId,
}: MapRecommendationProps) {
  const recommendationCircleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const { current } = svgRef;
    if (recommendationRoutine?.length > 0) {
      recommendationCircleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });

      current?.classList.add("recommedation-path");
    }
    return () => {
      current?.classList.remove("recommedation-path");
    };
  }, [recommendationRoutine]);

  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2; // Start from top
    const x = 150 + 135 * Math.cos(angle);
    const y = 150 + 135 * Math.sin(angle);
    return { x, y };
  };

  if (recommendationRoutine.length === 0) {
    return (
      <article className="flex size-full items-center justify-center ">
        <button
          type="button"
          className="rounded-md bg-blue-5 px-10 py-5 text-white"
          onClick={openRecommendationModal}
        >
          추천 경로 생성
        </button>
      </article>
    );
  }

  return (
    <article className="flex flex-col items-center justify-center gap-y-20 px-10">
      <button
        type="button"
        className="rounded-md bg-slate-400 px-10 py-5 text-white hover:bg-slate-500"
        onClick={openRecommendationModal}
      >
        추천 경로 재생성
      </button>
      <div
        ref={recommendationCircleRef}
        className="relative size-200 sm:size-250"
      >
        <div className="absolute inset-0 rounded-full border">
          <div className="recommedation-start left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold">
            Start
          </div>
          {recommendationRoutine.map((item, index) => {
            const { x, y } = getPosition(index, recommendationRoutine.length);
            return (
              <div
                key={item.id}
                className="recommedation-point"
                style={{
                  left: `${x / 3}%`,
                  top: `${y / 3}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                {item.title}
              </div>
            );
          })}
          <svg ref={svgRef} viewBox="0 0 300 300">
            <path
              d="M150,150 L150,15 A135,135 0 1,1 149.99,15"
              fill="none"
              stroke="red"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      <ul className="flex w-full flex-col items-center gap-10">
        {recommendationRoutine.map((place) => (
          <MapSideItem
            key={place.id}
            marker={place}
            clickedMarkerId={clickedMarkerId}
            changeCenterPosition={changeCenterPosition}
          />
        ))}
      </ul>
    </article>
  );
}
