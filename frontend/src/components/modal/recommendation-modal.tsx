import { useState } from "react";

import { useModalStore } from "@/store";

import { DrawerDialogContainer } from "./modal-container";

type RecommendType = "score" | "shortest";

type ShowCoordinateType = {
  searchTarget: "EXHIBITION" | "POPUPS";
  id: number;
  title: string;
  latitude: number;
  longitude: number;
  location: string;
  startDate: string;
  endDate: string;
  visitedCount: number;
  likedCount: number;
};

type RecommendationStateType = {
  recommendType: RecommendType;
  myCoordinate: {
    latitude: number;
    longitude: number;
  };
  showsCoordinates: ShowCoordinateType[];
};

const filterPlace = (place: MarkerType): ShowCoordinateType => ({
  ...place,
  latitude: place.position.latitude.value,
  longitude: place.position.longitude.value,
  location: place.position.location,
});

function RecommendationForm() {
  const { onClose, data } = useModalStore();
  const [errorMessage, setErrorMessage] = useState("");
  const [pending, setPending] = useState(false);
  const [recommendationState, setRecommendationState] =
    useState<RecommendationStateType>({
      recommendType: "score",
      myCoordinate: {
        latitude: data.currentPosition!.lat,
        longitude: data.currentPosition!.lng,
      },
      showsCoordinates: data.places!.map((place) => filterPlace(place)),
    });
  const handleRecommendChange = (
    isCheck: boolean,
    recommendType: RecommendType,
  ) => {
    if (isCheck)
      setRecommendationState((p) => ({
        ...p,
        recommendType,
      }));
  };

  const handlePlaceClick = (isChecked: boolean, id: number) => {
    if (isChecked) {
      const place = data.places?.find((p) => p.id === id);
      if (!place) return;
      setRecommendationState((p) => ({
        ...p,
        showsCoordinates: [...p.showsCoordinates, filterPlace(place)],
      }));
    } else {
      setRecommendationState((p) => ({
        ...p,
        showsCoordinates: p.showsCoordinates.filter((show) => show.id !== id),
      }));
    }
  };

  const handleSubmit = async () => {
    setPending(true);
    try {
      if (recommendationState.showsCoordinates.length < 2)
        throw new Error("추천 경로를 위해 두 곳 이상의 장소를 선택해주세요.");
      if (recommendationState.showsCoordinates.length > 8)
        throw new Error("최대 여덟 장소의 경로를 추천해드려요.");
      // const res = await fetch("/api/maps/recommendation-route", {
      //   method: "GET",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(recommendationState),
      // });
      // if (!res.ok) throw new Error("서버 에러");
      // const responseData = await res.json();
      // window.sessionStorage.setItem(
      //   "recommendation",
      //   JSON.stringify(responseData),
      // );
      data.onSuccess!(
        recommendationState.showsCoordinates.map((r) => ({
          id: r.id,
          searchTarget: r.searchTarget,
          title: r.title,
          position: {
            location: r.location,
            latitude: {
              value: r.latitude,
            },
            longitude: {
              value: r.longitude,
            },
          },
          startDate: r.startDate,
          endDate: r.endDate,
          visitedCount: r.visitedCount,
          likedCount: r.likedCount,
        })),
      );
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setPending(false);
    }
  };

  if (pending) return <div>추천 경로 생성 중...</div>;

  return (
    <section className="min-w-340 space-y-20">
      <header>
        <h3 className="text-20 font-extrabold">경로를 추천해드려요.</h3>
        <p className="text-14 text-slate-500">
          현재 위치를 기준으로{" "}
          <span className="text-red-400">최대 여덟 장소</span>의 경로를
          추천해드립니다.
        </p>
      </header>
      <div className="flex items-center gap-x-10">
        <div>
          <input
            className="recommend peer"
            type="radio"
            name="recommend"
            id="popular"
            defaultChecked
            onChange={(e) => handleRecommendChange(e.target.checked, "score")}
          />
          <label
            htmlFor="popular"
            className="cursor-pointer rounded-md border px-10 py-5 peer-checked:border-blue-6 peer-checked:bg-blue-4 peer-checked:text-white"
          >
            인기 순
          </label>
        </div>
        <div>
          <input
            className="recommend peer"
            type="radio"
            name="recommend"
            id="short"
            onChange={(e) =>
              handleRecommendChange(e.target.checked, "shortest")
            }
          />
          <label
            htmlFor="short"
            className="cursor-pointer rounded-md border px-10 py-5 peer-checked:border-blue-6 peer-checked:bg-blue-4 peer-checked:text-white"
          >
            거리 순
          </label>
        </div>
      </div>
      <div className="max-h-400 overflow-y-auto">
        <div className="flex flex-col gap-20 py-10">
          {data.places?.map((place) => (
            <div key={place.id}>
              <input
                type="checkbox"
                className="recommend peer"
                id={`${place.id}`}
                defaultChecked
                onChange={(e) => handlePlaceClick(e.target.checked, place.id)}
              />
              <label
                className="cursor-pointer truncate rounded-md border-2 px-12 py-5 hover:bg-slate-100 peer-checked:border-blue-7 peer-checked:bg-blue-7 peer-checked:text-white"
                htmlFor={`${place.id}`}
              >
                {place.title}
              </label>
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-x-20" />
      <footer>
        <button
          className={`rounded-md border px-10 py-5 ${recommendationState.showsCoordinates.length === 0 && "cursor-not-allowed"}`}
          type="button"
          onClick={handleSubmit}
        >
          추천 받기
        </button>
        <div className="text-14 text-red-500">{errorMessage}</div>
      </footer>
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
