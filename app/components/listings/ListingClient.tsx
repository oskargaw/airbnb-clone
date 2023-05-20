"use client";

import { ReactElement, useMemo } from "react";
import { Reservation } from "@prisma/client";

import { SafeListing, SafeUser } from "@/app/types";

import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "../navbar/Categories";

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
  currentUser?: SafeUser | null;
}

export default function ListingClient({
  listing,
  currentUser,
}: ListingClientProps): ReactElement {
  // Constants
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

  return (
    <Container>
      <div className="mx-auto max-w-screen-lg">
        <div className="flex flex-col gap-6">
          <ListingHead
            id={listing.id}
            title={listing.title}
            currentUser={currentUser}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
          />

          <div className="mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
}
