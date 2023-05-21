"use client";

import { ReactElement, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Range } from "react-date-range";
import { useRouter } from "next/navigation";
import { Reservation } from "@prisma/client";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";

import { SafeListing, SafeUser } from "@/app/types";
import useLoginModal from "@/app/hooks/useLoginModal";

import Container from "../Container";
import ListingHead from "./ListingHead";
import ListingInfo from "./ListingInfo";
import { categories } from "../navbar/Categories";
import ListingReservation from "./ListingReservation";

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: "selection",
};

interface ListingClientProps {
  listing: SafeListing & {
    user: SafeUser;
  };
  reservations?: Reservation[];
  currentUser?: SafeUser | null;
}

export default function ListingClient({
  listing,
  reservations = [],
  currentUser,
}: ListingClientProps): ReactElement {
  // State
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  // Hooks
  const router = useRouter();
  const loginModal = useLoginModal();

  // Handlers
  const handleChangeDate = useCallback((value: Range) => {
    setDateRange(value);
  }, []);

  const handleCreateReservation = useCallback(async () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    setIsLoading(true);

    try {
      axios.post("/api/reservations", {
        listingId: listing?.id,
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
      });

      toast.success("Listing reserved!");

      setDateRange(initialDateRange);

      // Redirect to /trips
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  }, [router, dateRange, loginModal, totalPrice, currentUser, listing?.id]);

  // Constants
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });

    return dates;
  }, [reservations]);

  // Effects
  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

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

            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
                onSubmit={handleCreateReservation}
                onChangeDate={handleChangeDate}
              />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
