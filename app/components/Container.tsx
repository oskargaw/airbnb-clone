"use client";

import { ReactElement, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps): ReactElement {
  return (
    <div className="mx-auto max-w-[2520px] px-4 sm:px-2 md:px-10 xl:px-20">
      {children}
    </div>
  );
}
