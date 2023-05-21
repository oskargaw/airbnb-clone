"use client";

import { ReactElement } from "react";
import { DateRange, Range, RangeKeyDict } from "react-date-range";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
  value: Range;
  onChange(value: RangeKeyDict): void;
  disabledDates?: Date[];
}

export default function Calendar({
  value,
  onChange,
  disabledDates,
}: CalendarProps): ReactElement {
  return (
    <DateRange
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      minDate={new Date()}
      direction="vertical"
      showDateDisplay={false}
      disabledDates={disabledDates}
      onChange={onChange}
    />
  );
}
