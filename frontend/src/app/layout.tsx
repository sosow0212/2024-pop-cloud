import "./globals.css";

import Script from "next/script";
import { Metadata } from "next";
import Script from "next/script";

import Toast from "@/components/common/toast";
import MainContainer from "@/components/main-container";
import MobileHeader from "@/components/mobile-header";
import MobileSizeWatcher from "@/components/mobile-size-watcher";
import NavBar from "@/components/nav-bar";
import ModalProvider from "@/provider/modal-provider";

import { MSWComponent } from "../mocks/msw-Initializer";

export const metadata: Metadata = {
  title: "POP CLOUD",
  description: "전시회 골라 골라",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="md:flex">
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <MSWComponent />
        <ModalProvider />
        <MobileSizeWatcher />
        <MobileHeader />
        <NavBar />
        <Toast />
        <MainContainer>{children}</MainContainer>
      </body>
    </html>
  );
}
