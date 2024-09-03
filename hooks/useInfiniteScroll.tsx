"use client";
import { useInView } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

type IUseInfiniteScroll = {
  loadMoreFunC: () => void;
  shouldMore: boolean;
  bottomRef: RefObject<HTMLInputElement>;
};
const useInfiniteScroll = ({
  bottomRef,
  shouldMore,
  loadMoreFunC,
}: IUseInfiniteScroll) => {
  const isInView = useInView(bottomRef, {
    amount: 0.5,
    // once: true,
  });
  useEffect(() => {
    if (isInView && shouldMore) {
      console.log("asd");
    }
  }, [isInView]);
};

export default useInfiniteScroll;
