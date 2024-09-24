import type { Metadata } from "next";
import "./globals.css";
import MobileSizeWatcher from "@/components/mobile-size-watcher";
import NavBar from "@/components/nav-bar";
import MobileHeader from "@/components/mobile-header";

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
        <MobileHeader />
        <NavBar />
        <main className="mb-50 md:mb-0 md:ml-70 lg:ml-245">{children}</main>
      </body>
    </html>
  );
}
