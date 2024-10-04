"use client";

import React, { useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";

interface LikeButtonProps {
  initialLiked?: boolean;
  onChange?: (isLiked: boolean) => void;
  size?: number;
  color?: string;
  className?: string;
}

export default function LikeButton({
  initialLiked = false,
  onChange,
  size = 20,
  color = "text-black",
  className,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleToggle = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onChange?.(newLikedState);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`focus:outline-none ${className}`}
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
    >
      {isLiked ? (
        <GoHeartFill className="shrink-0 text-white" size={size} />
      ) : (
        <GoHeart className={`shrink-0 ${color}`} size={size} />
      )}
    </button>
  );
}
