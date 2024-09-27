"use client";

import clsx from "clsx";
import React, { useState } from "react";

import { RegionType } from "../types/index";
import CheckboxList from "./check-list";

const regions: RegionType = {
  서울: ["서울 전체", "강남구", "서초구", "종로구", "중구", "마포구"],
  경기: ["경기 전체", "수원시", "성남시", "용인시", "부천시", "안산시"],
  부산: ["부산 전체", "해운대구", "부산진구", "동래구", "남구", "북구"],
  강원: ["강원 전체", "춘천시", "원주시", "강릉시", "속초시", "동해시"],
  대구: ["대구 전체", "중구", "동구", "서구", "남구", "북구"],
  제주: ["제주 전체", "제주시", "서귀포시"],
  경북: ["경북 전체", "포항시", "경주시", "안동시", "구미시", "영주시"],
  대전: ["대전 전체", "동구", "중구", "서구", "유성구", "대덕구"],
};

function RegionSelector() {
  const [selectedRegion, setSelectedRegion] = useState<keyof RegionType | null>(
    null,
  );

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {(Object.keys(regions) as Array<keyof RegionType>).map((region) => (
          <button
            type="button"
            key={region}
            onClick={() => setSelectedRegion(region)}
            className={clsx(
              "text-sm border p-2",
              selectedRegion === region
                ? "bg-black text-white"
                : "bg-white text-black",
            )}
          >
            {region}
          </button>
        ))}
      </div>
      {selectedRegion && <CheckboxList items={regions[selectedRegion]} />}
    </div>
  );
}

export default RegionSelector;
