"use client";

import { ReactElement, useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
  error: Error;
}

export default function ErrorState({ error }: ErrorStateProps): ReactElement {
  // Effects
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}
