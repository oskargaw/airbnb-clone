"use client";

import { ReactElement, useMemo } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";

import useCountries from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";

import Button from "../Button";
import HeartButton from "../HeartButton";

interface ListingCardProps {
  data: SafeListing;
  reservation?: Reservation;
  disabled?: boolean;
  actionId?: string;
  actionLabel?: string;
  currentUser?: SafeUser | null;
  onAction?(id: string): void;
}

export default function ListingCard({
  data,
  reservation,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
  onAction,
}: ListingCardProps): ReactElement {
  // Hooks
  const router = useRouter();
  const { getByValue } = useCountries();

  // Handlers
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (disabled) {
      return;
    }

    onAction?.(actionId);
  };

  // Constants
  const location = getByValue(data.locationValue);

  const price = reservation ? reservation.totalPrice : data.price;

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  }, [reservation]);

  return (
    <div
      className="group col-span-1 cursor-pointer"
      onClick={() => router.push(`/listings/${data.id}`)}
    >
      <div className="flex w-full flex-col gap-2">
        <div className="relative aspect-square w-full overflow-hidden rounded-xl">
          <Image
            fill
            alt="Listing"
            src={data.imageSrc}
            className="h-full w-full object-cover transition group-hover:scale-110"
          />

          <div className="absolute right-3 top-3">
            <HeartButton listingId={data.id} currentUser={currentUser} />
          </div>
        </div>

        <div className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </div>

        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>

        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>

          {!reservation ? <div className="font-light">night</div> : null}
        </div>

        {onAction && actionLabel ? (
          <Button
            small
            label={actionLabel}
            disabled={disabled}
            onClick={handleCancel}
          />
        ) : null}
      </div>
    </div>
  );
}
