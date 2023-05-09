"use client";

import { ReactElement, useCallback, useMemo, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import { categories } from "../navbar/Categories";
import CategoryInput from "../inputs/CategoryInput";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";

enum STEPS {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export default function RentModal(): ReactElement {
  // State
  const [step, setStep] = useState(STEPS.CATEGORY);

  // Hooks
  const rentModal = useRentModal();

  const { register, handleSubmit, setValue, watch } = useForm<FieldValues>({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      imageSrc: "",
      location: null,
      guestCount: 1,
      roomCount: 1,
      bathroomCount: 1,
      price: 1,
    },
  });

  // Functions
  const setCustomValue = useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue]
  );

  const onBack = () => {
    setStep((value) => value - 1);
  };

  const onNext = () => {
    setStep((value) => value + 1);
  };

  // Handlers
  const handleSetCategory = useCallback(
    (category: string) => {
      setCustomValue("category", category);
    },
    [setCustomValue]
  );

  const handleSetLocation = useCallback(
    (location: CountrySelectValue) => {
      setCustomValue("location", location);
    },
    [setCustomValue]
  );

  // Constants
  const category = watch("category");
  const location = watch("location");

  const actionLabel = useMemo(() => {
    if (step === STEPS.PRICE) {
      return "Create";
    }

    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return "Back";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === STEPS.CATEGORY) {
      return undefined;
    }

    return onBack;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which of these best describes your place?"
        subtitle="Pick a category"
      />

      <div className="grid max-h-[50vh] grid-cols-1 gap-3 overflow-y-auto md:grid-cols-2">
        {categories.map(({ label, icon }) => (
          <div key={label} className="col-span-1">
            <CategoryInput
              label={label}
              icon={icon}
              selected={category === label}
              onClick={handleSetCategory}
            />
          </div>
        ))}
      </div>
    </div>
  );

  if (step === STEPS.LOCATION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Where is your place located?"
          subtitle="Help guests find you!"
        />

        <CountrySelect value={location} onChange={handleSetLocation} />
      </div>
    );
  }

  return (
    <Modal
      title="Airbnb your home"
      body={bodyContent}
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      isOpen={rentModal.isOpen}
      onSubmit={onNext}
      onClose={rentModal.onClose}
      secondaryAction={secondaryAction}
    />
  );
}
