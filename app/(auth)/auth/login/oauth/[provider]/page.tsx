"use client";

import { redirect } from "next/navigation";
import { useEffect } from "react";

interface OAuthPageProps {
  params: {
    provider: string;
  };
  searchParams: {
    code: string;
  };
}

const OAuthPage = ({ params, searchParams }: OAuthPageProps) => {
  useEffect(() => {
    const { code } = searchParams;
    // if (!code) redirect("/");
  }, [searchParams]);
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div>{params.provider}</div>
      <div className="size-12 animate-spin rounded-full border-4 border-black border-b-transparent" />
    </div>
  );
};

export default OAuthPage;
