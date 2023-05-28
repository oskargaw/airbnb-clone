"use client";

import { ReactElement, useCallback, useMemo, useState } from "react";
import qs from "query-string";
import dynamic from "next/dynamic";
import { formatISO } from "date-fns";
import { Range, RangeKeyDict } from "react-date-range";
import { useRouter, useSearchParams } from "next/navigation";

import useSearchModal from "@/app/hooks/useSearchModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Counter from "../inputs/Counter";
import Calendar from "../inputs/Calendar";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

const Steps = {
  Location: 0,
  Date: 1,
  Info: 2,
} as const;

type StepsKeys = (typeof Steps)[keyof typeof Steps];

export default function SearchModal(): ReactElement {
  // State
  const [roomCount, setRoomCount] = useState(1);
  const [guestCount, setGuestCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [step, setStep] = useState<StepsKeys>(Steps.Location);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  // Hooks
  const router = useRouter();
  const searchModal = useSearchModal();
  const searchParams = useSearchParams();

  // Functions
  const onBack = () => {
    setStep((value) => (value - 1) as StepsKeys);
  };

  const onNext = () => {
    setStep((value) => (value + 1) as StepsKeys);
  };

  const onSubmit = useCallback(async () => {
    if (step !== Steps.Info) {
      return onNext();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(Steps.Location);
    searchModal.onClose();

    router.push(url);
  }, [
    step,
    router,
    location,
    dateRange,
    roomCount,
    guestCount,
    searchModal,
    searchParams,
    bathroomCount,
  ]);

  // Handlers
  const handleLocationChange = useCallback((value: CountrySelectValue) => {
    setLocation(value);
  }, []);

  const handleDateRangeChange = useCallback((value: RangeKeyDict) => {
    setDateRange(value.selection);
  }, []);

  const handleGuestCountChange = useCallback((value: number) => {
    setGuestCount(value);
  }, []);

  const handleRoomCountChange = useCallback((value: number) => {
    setRoomCount(value);
  }, []);

  const handleBathroomCountChange = useCallback((value: number) => {
    setBathroomCount(value);
  }, []);

  // Constants
  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

  const actionLabel = useMemo(() => {
    if (step === Steps.Info) {
      return "Search";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.Location) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === Steps.Location) {
      return undefined;
    }

    return onBack;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the perfect location!"
      />

      <CountrySelect value={location} onChange={handleLocationChange} />

      <hr />

      <Map center={location?.latlng} />
    </div>
  );

  if (step === Steps.Date) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />

        <Calendar value={dateRange} onChange={handleDateRangeChange} />
      </div>
    );
  }

  if (step === Steps.Info) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />

        <Counter
          title="Guests"
          subtitle="How many guests are coming?"
          value={guestCount}
          onChange={handleGuestCountChange}
        />

        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={handleRoomCountChange}
        />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={handleBathroomCountChange}
        />
      </div>
    );
  }

  return (
    <Modal
      title="Filters"
      body={bodyContent}
      actionLabel={actionLabel}
      isOpen={searchModal.isOpen}
      secondaryAction={secondaryAction}
      secondaryActionLabel={secondaryActionLabel}
      onSubmit={onSubmit}
      onClose={searchModal.onClose}
    />
  );
}
