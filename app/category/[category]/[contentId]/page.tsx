import React from "react";

interface ContentPageProps {
  params: {
    contentId: string;
    category: string;
  };
}

const ContentPage = ({ params }: ContentPageProps) => {
  return (
    <section className="h-full">
      <div>팝업/전시회인지 {params.category}</div>
      <div>
        팝업/전시회 상세 페이지로써 해당 data의 id로 판단
        {params.contentId}
      </div>
    </section>
  );
};

export default ContentPage;
