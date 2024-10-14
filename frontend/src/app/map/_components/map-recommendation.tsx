import Image from "next/image";
import React, { useEffect, useRef } from "react";

export default function MapRecommendation({
  recommendationRoutine = [],
}: {
  recommendationRoutine: RecommendationResponse[];
}) {
  const recommendationCircleRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    const { current } = svgRef;
    if (recommendationRoutine?.length > 0) {
      recommendationCircleRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
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

  if (recommendationRoutine.length === 0) return null;

  return (
    <article className="flex flex-col items-center justify-center gap-y-20 px-10">
      <h5 className="rounded-md bg-slate-200 px-12 py-8 ">추천 경로</h5>
      <div ref={recommendationCircleRef} className="relative size-[300px]">
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
      <ul className="flex flex-wrap items-center gap-10">
        {recommendationRoutine.map((item, idx) => (
          <li key={item.id} className="w-80 rounded-md border md:w-120">
            <div className="relative h-80 w-full md:h-120">
              <Image
                src="/images/luffi.jpg"
                fill
                className="object-center"
                alt={`${item.title}`}
              />
            </div>
            <div className="truncate ">
              <span className="font-extrabold text-blue-7">({idx + 1})</span>
              {item.title}
            </div>
          </li>
        ))}
      </ul>
    </article>
  );
}
