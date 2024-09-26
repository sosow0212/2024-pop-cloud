import React from "react";

import EventCard from "@/components/common/list-card";
import { PopupBasic } from "@/mocks/dummy"; // 더미 데이터 타입을 임포트합니다

async function getPopups(pageSize: number = 10): Promise<PopupBasic[]> {
  const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/popups`);
  url.searchParams.append("pageSize", pageSize.toString());

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch popups");
  }

  return res.json();
}

export default async function PopupListPage() {
  try {
    const popups = await getPopups();

    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl mb-6 font-bold">팝업 스토어 목록</h1>
        <div className="space-y-4">
          {popups.map((popup) => (
            <EventCard key={popup.id} event={popup} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching popups:", error); //eslint-disable-line
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl mb-6 font-bold">팝업 스토어 목록</h1>
        <p className="text-red-500">
          팝업 스토어 정보를 불러오는데 실패했습니다.
        </p>
      </div>
    );
  }
}
