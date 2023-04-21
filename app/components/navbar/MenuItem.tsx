"use client";

import { ReactElement } from "react";

interface MenuItemProps {
  label: string;
  onClick: () => void;
}

export default function MenuItem({
  label,
  onClick,
}: MenuItemProps): ReactElement {
  return (
    <div
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
