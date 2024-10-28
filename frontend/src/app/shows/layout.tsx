import { Metadata } from "next";

import FilterWrapper from "./_components/filter-wrapper";

export const metadata: Metadata = {
  title: "팝업,전시회 목록 | POP CLOUD",
  description: "팝업스토어 및 전시회 목록입니다",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterWrapper />
      <div className="min-h-screen w-full max-w-1400 p-30 pt-40 lg:px-70 lg:pt-50">
        {children}
      </div>
    </>
  );
}
