import { useState, useEffect } from "react";

const useMediaQuery = (pivotWidth: number) => {
  const [isDesktop, setIsDesktop] = useState<boolean | undefined>();

  useEffect(() => {
    const checkIsDesktop = () => window.innerWidth >= pivotWidth;
    setIsDesktop(checkIsDesktop);

    const handleResize = () => setIsDesktop(checkIsDesktop);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [pivotWidth]);

  return isDesktop;
};

export default useMediaQuery;
