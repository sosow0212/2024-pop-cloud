import type { Metadata } from "next";
import "./globals.css";
import MobileSizeWatcher from "@/components/mobile-size-watcher";
import NavBar from "@/components/nav-bar";

export const metadata: Metadata = {
  title: "POP ClOUD",
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
        <MobileSizeWatcher />
        <NavBar />
        {children}
      </body>
    </html>
  );
}
