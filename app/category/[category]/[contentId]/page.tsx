import React from "react";

interface ContentPageProps {
  params: {
    contentId: string;
  };
}

const ContentPage = ({ params }: ContentPageProps) => {
  return <div className="h-full">{params.contentId}</div>;
};

export default ContentPage;
