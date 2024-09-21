import { useEffect, useState } from "react";

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mobileMediaQuery = window.matchMedia("(max-width: 480px)"); // 모바일 기준

    const handleChange = () => setIsMobile(mobileMediaQuery.matches);

    // 초기 상태 설정
    setIsMobile(mobileMediaQuery.matches);

    // 이벤트 리스너 등록
    mobileMediaQuery.addEventListener("change", handleChange);

    // 클린업 함수
    return () => {
      mobileMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return isMobile;
};

export default useIsMobile;
