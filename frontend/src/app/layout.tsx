import "./globals.css";

import { Metadata } from "next";

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
      <body>
        <MSWComponent />
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
