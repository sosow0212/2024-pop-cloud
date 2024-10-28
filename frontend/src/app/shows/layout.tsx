import { Metadata } from "next";

import FilterContainer from "./_components/filter-container";

export const metadata: Metadata = {
  title: "팝업,전시회 목록 | POP CLOUD",
  description: "팝업스토어 및 전시회 목록입니다",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FilterContainer />
      <div className="min-h-screen w-full max-w-1400 p-30 pt-40 lg:px-70 lg:pt-50">
        {children}
      </div>
    </>
  );
}
