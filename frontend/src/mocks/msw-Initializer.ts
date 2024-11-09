/* eslint-disable  */
"use client";
import { useEffect } from "react";

export const MSWComponent = () => {
  useEffect(() => {
    const enableMocking = async () => {
      if (
        typeof window !== "undefined" &&
        process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
      ) {
        const { worker } = await import("./browser");
        await worker.start({
          onUnhandledRequest: "bypass",
        });
      }
    };

    enableMocking().catch(console.error);
  }, []);

  return null;
};
