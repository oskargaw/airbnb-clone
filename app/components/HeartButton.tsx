"use client";

import { ReactElement } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { SafeUser } from "../types";

interface HeartButtonProps {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps): ReactElement {
  // Functions
  const handleToggleFavorite = () => {};

  // Constants
  const hasFavorited = false;

  return (
    <div
      onClick={handleToggleFavorite}
      className="relative cursor-pointer transition hover:opacity-80"
    >
      <AiOutlineHeart
        size={28}
        className="absolute -right-[2px] -top-[2px] fill-white"
      />

      <AiFillHeart
        size={24}
        className={hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
      />
    </div>
  );
}
