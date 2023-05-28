"use client";

import { ReactElement } from "react";
import { PuffLoader } from "react-spinners";

export default function Loader(): ReactElement {
  return (
    <div className="flex h-[70vh] flex-col items-center justify-center">
      <PuffLoader size={100} color="red" />
    </div>
  );
}
