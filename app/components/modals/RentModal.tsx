"use client";

import { ReactElement, useCallback, useMemo, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRentModal from "@/app/hooks/useRentModal";

import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
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
  const [isLoading, setIsLoading] = useState(false);

  // Hooks
  const router = useRouter();
  const rentModal = useRentModal();

  const {
    reset,
    watch,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
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

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (step !== STEPS.PRICE) {
      return onNext();
    }

    setIsLoading(true);

    try {
      await axios.post("/api/listings", data);

      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(STEPS.CATEGORY);

      rentModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
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
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        ssr: false,
      }),
    [location]
  );

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

        <Map center={location?.latlng} />
      </div>
    );
  }

  if (step === STEPS.INFO) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Share some basics about your place"
          subtitle="What amenities do you have?"
        />

        <Counter
          title="Guests"
          subtitle="How many guests do you allow?"
          value={guestCount}
          onChange={(value) => setCustomValue("guestCount", value)}
        />

        <hr />

        <Counter
          title="Rooms"
          subtitle="How many roooms do you have?"
          value={roomCount}
          onChange={(value) => setCustomValue("roomCount", value)}
        />

        <hr />

        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you have?"
          value={bathroomCount}
          onChange={(value) => setCustomValue("bathroomCount", value)}
        />

        <hr />
      </div>
    );
  }

  if (step === STEPS.IMAGES) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Add a photo of your place"
          subtitle="Show guests what your place looks like!"
        />

        <ImageUpload
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>
    );
  }

  if (step === STEPS.DESCRIPTION) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="How would you describe your place?"
          subtitle="Short and sweet works the best!"
        />

        <Input
          required
          id="title"
          label="Title"
          errors={errors}
          register={register}
          disabled={isLoading}
        />

        <hr />

        <Input
          required
          id="description"
          label="Description"
          errors={errors}
          register={register}
          disabled={isLoading}
        />
      </div>
    );
  }

  if (step === STEPS.PRICE) {
    bodyContent = (
      <div className="flex flex-col gap-8">
        <Heading
          title="Now, set your price"
          subtitle="How much do you charge per night?"
        />

        <Input
          required
          id="price"
          formatPrice
          label="Price"
          type="number"
          errors={errors}
          disabled={isLoading}
          register={register}
        />
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
      onSubmit={handleSubmit(onSubmit)}
      onClose={rentModal.onClose}
      secondaryAction={secondaryAction}
    />
  );
}
