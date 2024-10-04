"use client";

import clsx from "clsx";
import React, { useEffect, useState } from "react";

import { RegionType } from "../types/index";
import CheckboxList from "./check-list";

const regions: RegionType = {
  서울: ["강남구", "서초구", "종로구", "중구", "마포구"],
  경기: ["수원시", "성남시", "용인시", "부천시", "안산시"],
  부산: ["해운대구", "부산진구", "동래구", "남구", "북구"],
  강원: ["춘천시", "원주시", "강릉시", "속초시", "동해시"],
  대구: ["중구", "동구", "서구", "남구", "북구"],
  제주: ["제주시", "서귀포시"],
  경북: ["포항시", "경주시", "안동시", "구미시", "영주시"],
  대전: ["동구", "중구", "서구", "유성구", "대덕구"],
};

type City = keyof typeof regions;

interface RegionSelectorProps {
  selectedRegion: { city: string; country: string[] };
  onChange: (region: { city: string; country: string[] }) => void;
}

function RegionSelector({ selectedRegion, onChange }: RegionSelectorProps) {
  const [selectedCity, setSelectedCity] = useState<City>(
    (selectedRegion.city as City) || (Object.keys(regions)[0] as City),
  );

  useEffect(() => {
    setSelectedCity(
      (selectedRegion.city as City) || (Object.keys(regions)[0] as City),
    );
  }, [selectedRegion.city]);

  const handleCityChange = (city: City) => {
    setSelectedCity(city);
    onChange({ city: city as string, country: [] });
  };

  const handleCountryChange = (countries: string[]) => {
    const allOption = `${selectedCity} 전체`;
    if (countries.includes(allOption)) {
      // "전체"가 선택되면 다른 선택을 모두 해제하고 "전체"만 선택
      onChange({ city: selectedCity as string, country: [allOption] });
    } else {
      onChange({ city: selectedCity as string, country: countries });
    }
  };

  const countriesWithAll = [`${selectedCity} 전체`, ...regions[selectedCity]];

  return (
    <div>
      <div className="mb-4 grid grid-cols-4 gap-2">
        {(Object.keys(regions) as City[]).map((region) => (
          <button
            type="button"
            key={region}
            onClick={() => handleCityChange(region)}
            className={clsx(
              "text-sm border p-2",
              selectedCity === region
                ? "bg-black text-white"
                : "bg-white text-black",
            )}
          >
            {region}
          </button>
        ))}
      </div>
      <CheckboxList
        items={countriesWithAll}
        selectedItems={selectedRegion.country}
        onChange={handleCountryChange}
      />
    </div>
  );
}

export default RegionSelector;
