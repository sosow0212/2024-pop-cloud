import { useState } from "react";

import { useModalStore } from "@/store";

import { DrawerDialogContainer } from "./modal-container";

type RecommendType = "score" | "shortest";

type ShowType = {
  searchTarget: "EXHIBITION" | "POPUPS";
  id: string;
  title: string;
  lat: number;
  lng: number;
  startDate: Date;
  endDate: Date;
};

type ResultType = {
  recommendType: RecommendType;
  myCoordinate: {
    lat: number;
    lng: number;
  };
  show: ShowType[];
};

function RecommendationForm() {
  const { onClose, data } = useModalStore();

  const [result, setResult] = useState<ResultType>({
    recommendType: "score",
    myCoordinate: {
      lat: 0,
      lng: 0,
    },
    show: [],
  });
  const handleRecommendChange = (
    isCheck: boolean,
    recommendType: RecommendType,
  ) => {
    if (isCheck)
      setResult((p) => ({
        ...p,
        recommendType,
      }));
  };

  const handleClick = () => {
    window.sessionStorage.setItem(
      "recommend",
      JSON.stringify(JSON.stringify(result)),
    );
    onClose();
  };

  return (
    <section className="space-y-20">
      <header>
        <h3 className="text-20 font-extrabold">경로를 추천해드려요.</h3>
        <p className="text-14 text-slate-500">
          현재 위치를 기준으로 지도에 보이는 장소들의 경로를 추천해드립니다.
        </p>
      </header>
      <div className="flex items-center gap-x-10">
        <div>
          <input
            className="recommend peer"
            type="radio"
            name="recommend"
            id="a"
            defaultChecked
            onChange={(e) => handleRecommendChange(e.target.checked, "score")}
          />
          <label
            className="cursor-pointer rounded-md border px-10 py-5 peer-checked:border-blue-6 peer-checked:bg-blue-4 peer-checked:text-white"
            htmlFor="a"
          >
            인기 순
          </label>
        </div>
        <div>
          <input
            className="recommend peer"
            type="radio"
            name="recommend"
            id="b"
            onChange={(e) =>
              handleRecommendChange(e.target.checked, "shortest")
            }
          />
          <label
            className="cursor-pointer rounded-md border px-10 py-5 peer-checked:border-blue-6 peer-checked:bg-blue-4 peer-checked:text-white"
            htmlFor="b"
          >
            거리 순
          </label>
        </div>
      </div>
      {data.places?.map((place) => <div key={place.id}>{place.location}</div>)}
      <div className="flex items-center gap-x-20" />
      <button
        className="rounded-md border px-10 py-5"
        type="button"
        onClick={handleClick}
      >
        추천 받기
      </button>
    </section>
  );
}

export default function RecommendationModal() {
  const { isOpen, type, onClose } = useModalStore();
  const isModalOpen = isOpen && type === "recommendation";
  return (
    <DrawerDialogContainer
      isOpen={isModalOpen}
      onClose={onClose}
      className="rounded-lg bg-white p-25 shadow-lg "
    >
      <RecommendationForm />
    </DrawerDialogContainer>
  );
}
