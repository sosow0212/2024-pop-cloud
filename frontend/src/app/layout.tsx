import type { Metadata } from "next";

import "./globals.css";
import ModalProvider from "@/provider/modal-provider";

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
        <ModalProvider />
        {children}
      </body>
    </html>
  );
}
