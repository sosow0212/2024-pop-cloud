import "./globals.css";

import type { Metadata } from "next";
import Script from "next/script";
import { useEffect } from "react";

import MobileSizeWatcher from "@/components/mobile-size-watcher";
import NavBar from "@/components/nav-bar";
import ModalProvider from "@/provider/modal-provider";

export const metadata: Metadata = {
  title: "POP CLOUD",
  description: "전시회 골라 골라",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const initMocks = async () => {
        if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
          const { worker } = await import("../mocks/browser");
          await worker.start({ onUnhandledRequest: "bypass" });
        }
      };

      initMocks();
    }
  }, []);

  return (
    <html lang="ko">
      <body>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <ModalProvider />
        <MobileSizeWatcher />
        <NavBar />
        <NavBar />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
