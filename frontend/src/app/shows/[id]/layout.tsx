import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팝업,전시회 목록 | POP CLOUD",
  description: "팝업스토어 및 전시회 상세페이지 입니다",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="m-auto w-full px-20 py-30 md:px-110 md:py-60">
      {children}
    </div>
  );
}
