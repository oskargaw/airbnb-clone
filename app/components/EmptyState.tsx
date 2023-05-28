"use client";

import { ReactElement, useCallback } from "react";
import { useRouter } from "next/navigation";

import Button from "./Button";
import Heading from "./Heading";

interface EmptyState {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export default function EmptyState({
  title = "No exact matches",
  subtitle = "Try changing or removing some of your filters",
  showReset,
}: EmptyState): ReactElement {
  // Hooks
  const router = useRouter();

  // Handlers
  const handleRemoveAllFilters = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-2">
      <Heading center title={title} subtitle={subtitle} />

      <div className="mt-4 w-48">
        {showReset ? (
          <Button
            outline
            label="Remove all filters"
            onClick={handleRemoveAllFilters}
          />
        ) : null}
      </div>
    </div>
  );
}
