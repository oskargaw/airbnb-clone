"use client";

import { ReactElement } from "react";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Logo(): ReactElement {
  // Hooks
  const router = useRouter();

  // Handlers
  const handleClick = () => {
    router.push("/");
  };

  return (
    <Image
      alt="Logo"
      width="100"
      height="100"
      src="/images/logo.png"
      className="hidden cursor-pointer md:block"
      onClick={handleClick}
    />
  );
}
