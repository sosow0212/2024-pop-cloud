import type { Metadata } from "next";
import "./globals.css";
import ModalProvider from "@/provider/modal-provider";
import NavBar from "@/components/nav-bar";
import MobileSizeWatcher from "@/components/mobile-size-watcher";

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
