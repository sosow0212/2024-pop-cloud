/* eslint-disable */
import { http, HttpResponse } from "msw";
import { PopupBasic, createDummyPopups } from "./dummy";

const allPopups = createDummyPopups(20);

export const handlers = [
  http.get("/api/popups", async ({ request }) => {
    try {
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
            images,
            endDate,
            visitedCount,
            likedCount,
          }) => ({
            id,
            title,
            location,
            startDate,
            images,
            endDate,
            visitedCount,
            likedCount,
          }),
        );

      return HttpResponse.json(paginatedPopups, { status: 200 });
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),

  http.get("/api/popups/:popupsId", async ({ params }) => {
    try {
      const popupsId = parseInt(params.popupsId as string, 10);
      const popup = allPopups.find((p) => p.id === popupsId);

      if (popup) {
        return HttpResponse.json(popup, { status: 200 });
      } else {
        return new HttpResponse(null, { status: 404 });
      }
    } catch (error) {
      return new HttpResponse(null, { status: 500 });
    }
  }),
];
