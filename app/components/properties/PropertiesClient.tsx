"use client";

import { ReactElement, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeListing, SafeUser } from "@/app/types";

import Heading from "../Heading";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";

interface PropertiesClientProps {
  listings: SafeListing[];
  currentUser?: SafeUser;
}

export default function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps): ReactElement {
  // State
  const [deletingId, setDeletingId] = useState("");

  // Hooks
  const router = useRouter();

  // Handlers
  const handleDeleteProperty = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/listings/${id}`);

        toast.success("Property deleted");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            currentUser={currentUser}
            actionLabel="Delete property"
            disabled={deletingId === listing.id}
            onAction={handleDeleteProperty}
          />
        ))}
      </div>
    </Container>
  );
}
