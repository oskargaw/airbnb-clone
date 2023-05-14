"use client";

import { ReactElement } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

interface CounterProps {
  title: string;
  subtitle: string;
  value: number;
  onChange(value: number): void;
}

export default function Counter({
  title,
  subtitle,
  value,
  onChange,
}: CounterProps): ReactElement {
  // Handlers
  const handleAdd = () => {
    onChange(value + 1);
  };

  const handleReduce = () => {
    if (value === 1) {
      return;
    }

    onChange(value - 1);
  };

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{title}</div>

        <div className="font-light text-gray-600">{subtitle}</div>
      </div>

      <div className="flex flex-row items-center gap-4">
        <div
          onClick={handleReduce}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>

        <div className="text-xl font-light text-neutral-600">{value}</div>

        <div
          onClick={handleAdd}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-[1px] border-neutral-400 text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
}
