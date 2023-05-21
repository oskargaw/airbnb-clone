"use client";

import { ReactElement } from "react";
import { Range, RangeKeyDict } from "react-date-range";

import Button from "../Button";
import Calendar from "../inputs/Calendar";

interface ListingReservationProps {
  price: number;
  totalPrice: number;
  dateRange: Range;
  disabled: boolean;
  disabledDates: Date[];
  onSubmit(): void;
  onChangeDate(value: Range): void;
}

export default function ListingReservation({
  price,
  totalPrice,
  dateRange,
  disabled,
  disabledDates,
  onSubmit,
  onChangeDate,
}: ListingReservationProps): ReactElement {
  // Handlers
  const handleChangeDate = (value: RangeKeyDict) => {
    onChangeDate(value.selection);
  };

  return (
    <div className="overflow-hidden rounded-xl border-[1px] border-neutral-200 bg-white">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>

        <div className="font-light text-neutral-600">night</div>
      </div>

      <hr />

      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={handleChangeDate}
      />

      <hr />

      <div className="p-4">
        <Button label="Reserve" disabled={disabled} onClick={onSubmit} />
      </div>

      <div className="flex flex-row items-center justify-between p-4 text-lg font-semibold">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
}
