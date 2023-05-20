"use client";

import { ReactElement } from "react";
import Image from "next/image";

import { SafeUser } from "@/app/types";
import useCountries from "@/app/hooks/useCountries";

import Heading from "../Heading";
import HeartButton from "../HeartButton";

interface ListingHeadProps {
  id: string;
  title: string;
  imageSrc: string;
  locationValue: string;
  currentUser?: SafeUser | null;
}

export default function ListingHead({
  id,
  title,
  imageSrc,
  locationValue,
  currentUser,
}: ListingHeadProps): ReactElement {
  // Hooks
  const { getByValue } = useCountries();

  // Constants
  const location = getByValue(locationValue);

  return (
    <>
      <Heading
        title={title}
        subtitle={`${location?.region}, ${location?.label}`}
      />

      <div className="relative h-[60vh] w-full overflow-hidden rounded-xl">
        <Image
          alt="Image"
          src={imageSrc}
          fill
          className="w-full object-cover"
        />

        <div className="absolute right-5 top-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </div>
    </>
  );
}
