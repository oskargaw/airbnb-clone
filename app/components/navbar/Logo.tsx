"use client";

import { ReactElement } from "react";

import Image from "next/image";

export default function Logo(): ReactElement {
  return (
    <Image
      alt="Logo"
      className="hidden cursor-pointer md:block"
      height="100"
      width="100"
      src="/images/logo.png"
    />
  );
}
