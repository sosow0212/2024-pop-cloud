import type { Metadata } from "next";
import Script from "next/script";

import localFont from "next/font/local";
import "./globals.css";
import ModalProvider from "@/provider/modal-provider";

const pretendart = localFont({
  src: "../public/ko-font/PretendardVariable.woff2",
  display: "swap",
  weight: "45 920",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: "팝클라우드",
  description: "팝업스토어와 개인 전시회를 소개하는 공간",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={pretendart.className}>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP}&libraries=services,clusterer&autoload=false`}
          strategy="beforeInteractive"
        />
        <ModalProvider />
        <div className="relative mx-auto h-full max-w-xl md:max-w-2xl">
          {children}
        </div>
      </body>
    </html>
  );
}
