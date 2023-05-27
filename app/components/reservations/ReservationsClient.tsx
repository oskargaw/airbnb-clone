"use client";

import { ReactElement, useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeReservation, SafeUser } from "@/app/types";

import Heading from "../Heading";
import Container from "../Container";
import ListingCard from "../listings/ListingCard";

interface ReservationsClientProps {
  reservations: SafeReservation[];
  currentUser?: SafeUser | null;
}

export default function ReservationsClient({
  reservations,
  currentUser,
}: ReservationsClientProps): ReactElement {
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
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            actionId={reservation.id}
            currentUser={currentUser}
            reservation={reservation}
            data={reservation.listing}
            disabled={deletingId === reservation.id}
            actionLabel="Cancel guest reservation"
            onAction={handleCancelReservation}
          />
        ))}
      </div>
    </Container>
  );
}
