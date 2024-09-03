import { useCallback, useEffect, useRef, useState } from "react";

type IUseInfiniteScroll = {
  loadMoreFunC: () => void;
  shouldMore: boolean;
};
const useInfiniteScroll = ({
  shouldMore,
  loadMoreFunC,
}: IUseInfiniteScroll) => {
  const bottomRef = useRef<HTMLInputElement>(null);
  const [inView, setInView] = useState(false);

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    setInView(target.isIntersecting);
  }, []);

  useEffect(() => {
    const ob = new IntersectionObserver(handleObserver, { threshold: 1 });
    if (bottomRef.current) ob.observe(bottomRef.current);
    return () => {
      if (bottomRef.current) ob.unobserve(bottomRef.current);
    };
    // obRef.current.
  }, [bottomRef]);

  useEffect(() => {
    if (inView && shouldMore) {
      loadMoreFunC();
    }
  }, [inView, shouldMore]);
  return { inView, bottomRef };
};

export default useInfiniteScroll;
