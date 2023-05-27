"use client";

import { ReactElement } from "react";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "../Heading";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";

interface FavoritesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

export default function FavoritesClient({
  listings,
  currentUser,
}: FavoritesClientProps): ReactElement {
  return (
    <Container>
      <Heading
        title="Favorites"
        subtitle="List of places you have favorited!"
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
