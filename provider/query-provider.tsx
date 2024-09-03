"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  // 재랜더링 시 새로운 쿼리 클라이언트 생성 방지
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
// react-query는 서버의 값을 클라이언트에 가져오거나, 캐싱, 값 업데이트, 에러핸들링 등 비동기 과정을 더욱 편하게 하는데 사용됩니다.

// https://kyounghwan01.github.io/blog/React/react-query/basic/
//
