"use client";

import { ReactElement } from "react";
import qs from "query-string";
import { IconType } from "react-icons";
import { useRouter, useSearchParams } from "next/navigation";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export default function CategoryBox({
  icon: Icon,
  label,
  selected,
}: CategoryBoxProps): ReactElement {
  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();

  // Handlers
  const handleClick = () => {
    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (searchParams?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div
      className={`flex cursor-pointer flex-col items-center justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 ${
        selected ? "border-neutral-800" : "border-transparent"
      } ${selected ? "text-neutral-800" : "text-neutral-500"}`}
      onClick={handleClick}
    >
      <Icon size={26} />

      <div className="text-sm font-medium">{label}</div>
    </div>
  );
}
