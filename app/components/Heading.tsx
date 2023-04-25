"use client";

import { ReactElement } from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({
  title,
  subtitle,
  center,
}: HeadingProps): ReactElement {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <div className="text-2xl font-bold">{title}</div>

      <div className="mt-2 font-light text-neutral-500">{subtitle}</div>
    </div>
  );
}
