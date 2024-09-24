/* eslint-disable */

import { http, HttpResponse } from "msw";
import { PopupBasic, PopupDetail, createDummyPopups } from "./dummy";

// 20개의 더미 팝업 데이터 생성
const allPopups = createDummyPopups(20);

export const handlers = [
  // 팝업스토어 목록 API (기본 정보만 반환)
  http.get("/api/popups", ({ request }) => {
    const url = new URL(request.url);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
    const paginatedPopups: PopupBasic[] = allPopups
      .slice(0, pageSize)
      .map(
        ({
          id,
          title,
          location,
          startDate,
          endDate,
          visitedCount,
          likedCount,
        }) => ({
          id,
          title,
          location,
          startDate,
          endDate,
          visitedCount,
          likedCount,
        }),
      );

    return HttpResponse.json(paginatedPopups, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*",
        "Content-Type": "application/json",
      },
    });
  }),

  // 팝업스토어 상세 정보 API
  http.get("/api/popups/:popupsId", ({ params }) => {
    const popupsId = parseInt(params.popupsId as string, 10);
    const popup = allPopups.find((p) => p.id === popupsId);

    if (popup) {
      return HttpResponse.json(popup, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
          "Content-Type": "application/json",
        },
      });
    } else {
      return new HttpResponse(null, {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
  }),
];
