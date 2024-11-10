/* eslint-disable */
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  worker
    .start({
      onUnhandledRequest: "bypass",
      serviceWorker: {
        url: "/mockServiceWorker.js",
        options: {
          scope: "/",
        },
      },
      // 디버깅을 위한 워커 로그 활성화
      quiet: false,
    })
    .then(() => {
      console.log("MSW Worker started successfully");
    })
    .catch((error) => {
      console.error("MSW Worker failed to start:", error);
    });
}
