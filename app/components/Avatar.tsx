"use client";

import { ReactElement } from "react";
import Image from "next/image";

interface AvatarProps {
  src: string | null | undefined;
}

export default function Avatar({ src }: AvatarProps): ReactElement {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={src || "/images/placeholder.jpg"}
    />
  );
}
