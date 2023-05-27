"use client";

import { ReactElement, useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiOutlineMenu } from "react-icons/ai";

import { SafeUser } from "@/app/types";
import useRentModal from "@/app/hooks/useRentModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";

import Avatar from "../Avatar";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

export default function UserMenu({ currentUser }: UserMenuProps): ReactElement {
  // State
  const [isOpen, setIsOpen] = useState(false);

  // Hooks
  const router = useRouter();
  const rentModal = useRentModal();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();

  // Handlers
  const handleRedirectToTrips = () => {
    router.push("/trips");
  };

  const handleRedirectToReservations = () => {
    router.push("/reservations");
  };

  const handleRedirectToFavorites = () => {
    router.push("/favorites");
  };

  const handleRedirectToProperties = () => {
    router.push("/properties");
  };

  const handleSignOut = () => {
    signOut();
  };

  const handleOpenMenu = () => setIsOpen((value) => !value);

  const handleRentButtonClick = () => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  };

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block"
          onClick={handleRentButtonClick}
        >
          Airbnb your home
        </div>

        <div
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={handleOpenMenu}
        >
          <AiOutlineMenu />

          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-[40vw] overflow-hidden rounded-xl bg-white text-sm shadow-md md:w-3/4">
          <div className="flex cursor-pointer flex-col">
            {currentUser ? (
              <>
                <MenuItem label="My trips" onClick={handleRedirectToTrips} />
                <MenuItem
                  label="My favorites"
                  onClick={handleRedirectToFavorites}
                />
                <MenuItem
                  label="My reservations"
                  onClick={handleRedirectToReservations}
                />
                <MenuItem
                  label="My properties"
                  onClick={handleRedirectToProperties}
                />
                <MenuItem label="Airbnb my home" onClick={rentModal.onOpen} />

                <hr />

                <MenuItem label="Log out" onClick={handleSignOut} />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign Up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
