import React, { useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";

interface LikeButtonProps {
  initialLiked?: boolean;
  onChange?: (isLiked: boolean) => void;
  size?: number;
}

export default function LikeButton({
  initialLiked = false,
  onChange,
  size = 20,
}: LikeButtonProps) {
  const [isLiked, setIsLiked] = useState(initialLiked);

  const handleClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    onChange?.(newLikedState);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="focus:outline-none"
      aria-label={isLiked ? "좋아요 취소" : "좋아요"}
    >
      {isLiked ? (
        <FaHeart className="shrink-0 text-red-500" size={size} />
      ) : (
        <FaRegHeart className="shrink-0 text-black" size={size} />
      )}
    </button>
  );
}
