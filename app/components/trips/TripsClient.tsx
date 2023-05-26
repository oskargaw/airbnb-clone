"use client";

import { ReactElement, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "../Heading";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";

interface TripsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser;
}

export default function TripsClient({
  reservations,
  currentUser,
}: TripsClientProps): ReactElement {
  // State
  const [deletingId, setDeletingId] = useState("");

  // Hooks
  const router = useRouter();

  // Handlers
  const handleCancelReservation = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/reservations/${id}`);

        toast.success("Reservation cancelled");
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
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            currentUser={currentUser}
            actionLabel="Cancel reservation"
            disabled={deletingId === reservation.id}
            onAction={handleCancelReservation}
          />
        ))}
      </div>
    </Container>
  );
}
