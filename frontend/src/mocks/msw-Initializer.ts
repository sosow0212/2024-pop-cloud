/* eslint-disable  */
"use client";
import { useEffect } from "react";

// window 타입 확장
declare global {
  interface Window {
    mswInitialized?: boolean;
  }
}

export const MSWComponent = () => {
  useEffect(() => {
    const enableMocking = async () => {
      // 이미 초기화되었는지 확인
      if (window.mswInitialized) {
        return;
      }

      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        try {
          const { worker } = await import("./browser");
          await worker.start({
            onUnhandledRequest: "bypass",
          });

          window.mswInitialized = true;
          console.log("MSW Worker started successfully");
        } catch (error) {
          console.error("MSW Worker failed to start:", error);
        }
      }
    };

    enableMocking();
  }, []);

  return null;
};
