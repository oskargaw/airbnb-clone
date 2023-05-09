"use client";

import { ReactElement, useCallback } from "react";
import Select from "react-select";

import useCountries from "@/app/hooks/useCountries";

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

interface CountrySelectProps {
  value?: CountrySelectValue;
  onChange: (value: CountrySelectValue) => void;
}

export default function CountrySelect({
  value,
  onChange,
}: CountrySelectProps): ReactElement {
  // Hooks
  const { getAll } = useCountries();

  // Functions
  const formatOptionLabel = useCallback(
    (option: any) => (
      <div className="flex flex-row items-center gap-3">
        <div>{option.flag}</div>

        <div>
          {option.label},{" "}
          <span className="ml-1 text-neutral-500">{option.region}</span>
        </div>
      </div>
    ),
    []
  );

  // Handlers
  const handleChange = (value: any) => {
    onChange(value as CountrySelectValue);
  };

  return (
    <div>
      <Select
        isClearable
        value={value}
        options={getAll()}
        placeholder="Anywhere"
        onChange={handleChange}
        formatOptionLabel={formatOptionLabel}
        classNames={{
          control: () => "p-3 border-2",
          input: () => "text-lg",
          option: () => "text-lg",
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: "black",
            primary25: "#ffe4e6",
          },
        })}
      />
    </div>
  );
}
