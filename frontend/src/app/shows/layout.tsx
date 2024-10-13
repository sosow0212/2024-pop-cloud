import { Metadata } from "next";

export const metadata: Metadata = {
  title: "팝업,전시회 목록 | POP CLOUD",
  description: "팝업스토어 및 전시회 목록입니다",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full max-w-1000 p-30 sm:p-15">
      {children}
    </div>
  );
}
