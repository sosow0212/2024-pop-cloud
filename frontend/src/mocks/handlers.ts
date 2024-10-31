/* eslint-disable */
import { http, HttpResponse } from "msw";
import { ShowBasic, createDummyShows } from "./dummy";

const allShows = createDummyShows(1000);
export const MOCK_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ";
//리얼 더미토큰이라 아무것도 안담겨있어요
interface CreatePopupRequest {
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  openTimes: string;
  location: string;
  latitude: string;
  longitude: string;
  isParkingAvailable: boolean;
  isFoodAllowed: boolean;
  isPetAllowed: boolean;
  isKidsZone: boolean;
  isWifiAvailable: boolean;
  fee: number;
  publicTag: string;
  tags: string[];
}

export const handlers = [
  http.get("/api/shows", async ({ request }) => {
    try {
      const url = new URL(request.url);
      const showId = parseInt(url.searchParams.get("showId") || "0", 10);
      const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);
      const showType = url.searchParams.get("showType") || "POPUPS";
      const publicTags = url.searchParams.getAll("publicTags");
      const city = url.searchParams.get("city");
      const country = url.searchParams.getAll("country");
      const startDate = url.searchParams.get("startDate");
      const endDate = url.searchParams.get("endDate");

      console.log("Request parameters:", {
        showId,
        pageSize,
        showType,
        publicTags,
        city,
        country,
        startDate,
        endDate,
      });

      if (!startDate || !endDate) {
        return new HttpResponse(null, {
          status: 400,
          statusText: "Start date and end date are required",
        });
      }

      let filteredShows = allShows.filter((show) => {
        const showStartDate = new Date(show.startDate);
        const showEndDate = new Date(show.endDate);
        const filterStartDate = new Date(startDate);
        const filterEndDate = new Date(endDate);

        const dateCondition =
          showStartDate >= filterStartDate && showEndDate <= filterEndDate;

        console.log("Show dates:", {
          showId: show.showId,
          showStartDate,
          showEndDate,
          filterStartDate,
          filterEndDate,
          dateCondition,
        });

        return (
          (!showId || show.showId > showId) &&
          show.showType.toLowerCase() === showType.toLowerCase() &&
          (publicTags.length === 0 || publicTags.includes(show.publicTag)) &&
          (!city || show.location.includes(city)) &&
          (country.length === 0 ||
            country.some((c) => show.location.includes(c))) &&
          dateCondition
        );
      });

      console.log("Filtered shows count:", filteredShows.length);

      const paginatedShows: ShowBasic[] = filteredShows
        .slice(0, pageSize)
        .map(
          ({
            showId,
            showType,
            publicTag,
            title,
            location,
            startDate,
            endDate,
            visitedCount,
            images,
            likedCount,
          }) => ({
            showId,
            showType,
            publicTag,
            title,
            location,
            startDate,
            endDate,
            visitedCount,
            images,
            likedCount,
          }),
        );

      return HttpResponse.json(paginatedShows, { status: 200 });
    } catch (error) {
      console.error("Error in /api/shows handler:", error);
      return new HttpResponse(null, { status: 500 });
    }
  }),

  // http.get("/api/exhibitions/:exhibitionId", async ({ params }) => {
  //   try {
  //     const exhibitionId = parseInt(params.exhibitionId as string, 10);
  //     const exhibition = allShows.find(
  //       (s) => s.showId === exhibitionId && s.showType === "EXHIBITION",
  //     );

  //     if (exhibition) {
  //       return HttpResponse.json(exhibition, { status: 200 });
  //     } else {
  //       return new HttpResponse(null, {
  //         status: 404,
  //         statusText: "Exhibition not found",
  //       });
  //     }
  //   } catch (error) {
  //     return new HttpResponse(null, {
  //       status: 500,
  //       statusText: "Internal server error",
  //     });
  //   }
  // }),

  http.get("/api/popups/:popupId", async ({ params }) => {
    try {
      const popupId = parseInt(params.popupId as string, 10);
      const popup = allShows.find(
        (s) => s.showId === popupId && s.showType === "POPUPS",
      );

      if (popup) {
        return HttpResponse.json(popup, { status: 200 });
      } else {
        return new HttpResponse(null, {
          status: 404,
          statusText: "Popup not found",
        });
      }
    } catch (error) {
      return new HttpResponse(null, {
        status: 500,
        statusText: "Internal server error",
      });
    }
  }),

  // handlers.ts의 팝업 생성 핸들러 부분만 수정
  http.post<never, CreatePopupRequest>("/api/popups", async ({ request }) => {
    try {
      // Authorization 헤더 검증
      const authHeader = request.headers.get("Authorization");
      console.log("Authorization header:", authHeader); // 추가된 로그

      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return new HttpResponse(
          JSON.stringify({
            status: 401,
            message: "인증이 필요합니다.",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          },
        );
      }

      // 토큰 검증
      const token = authHeader.split("Bearer ")[1].trim();
      if (token !== MOCK_TOKEN) {
        return new HttpResponse(
          JSON.stringify({
            status: 401,
            message: "유효하지 않은 토큰입니다.",
          }),
          {
            status: 401,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          },
        );
      }

      const requestBody = (await request.json()) as CreatePopupRequest;

      // 필수 필드 검증
      if (
        !requestBody.title ||
        !requestBody.description ||
        !requestBody.startDate ||
        !requestBody.endDate
      ) {
        return new HttpResponse(
          JSON.stringify({
            status: 400,
            message: "필수 필드가 누락되었습니다.",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          },
        );
      }

      // 날짜 유효성 검증
      const startDate = new Date(requestBody.startDate);
      const endDate = new Date(requestBody.endDate);

      if (endDate <= startDate) {
        return new HttpResponse(
          JSON.stringify({
            status: 400,
            message: "종료일이 시작일보다 빠를 수 없습니다.",
          }),
          {
            status: 400,
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
            },
          },
        );
      }
      return new HttpResponse(
        JSON.stringify({
          status: 201,
          message: "팝업스토어가 성공적으로 등록되었습니다.",
          data: {
            id: 100,
          },
        }),
        {
          status: 201,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
    } catch (error) {
      console.error("Error in popup handler:", error);
      return new HttpResponse(
        JSON.stringify({
          status: 500,
          message: "서버 에러가 발생했습니다.",
        }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
          },
        },
      );
    }
  }),
];
