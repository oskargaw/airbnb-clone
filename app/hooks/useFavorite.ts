import { useCallback, useMemo } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { SafeUser } from "../types";
import useLoginModal from "./useLoginModal";

interface UseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

export default function useFavorite({ listingId, currentUser }: UseFavorite) {
  // Hooks
  const router = useRouter();
  const loginModal = useLoginModal();

  // Constants
  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  // Functions
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!currentUser) {
        return loginModal.onOpen();
      }

      try {
        let request;

        if (hasFavorited) {
          request = async () =>
            await axios.delete(`/api/favorites/${listingId}`);
        } else {
          request = async () => await axios.post(`/api/favorites/${listingId}`);
        }

        await request();

        router.refresh();
        toast.success("Success");
      } catch (error) {
        toast.error("Something went wrong.");
      }
    },
    [router, loginModal, currentUser, hasFavorited, listingId]
  );

  return {
    hasFavorited,
    toggleFavorite,
  };
}
