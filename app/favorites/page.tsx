import getCurrentUser from "../actions/getCurrentUser";
import getFavoriteListings from "../actions/getFavoriteListings";

import EmptyState from "../components/EmptyState";
import FavoritesClient from "../components/favorites/FavoritesClient";

export default async function FavoritesPage() {
  // Actions
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const favoriteListings = await getFavoriteListings();

  if (favoriteListings?.length === 0) {
    return (
      <EmptyState
        title="No favorites found"
        subtitle="Looks like you have no favorite listings."
      />
    );
  }

  return (
    <FavoritesClient currentUser={currentUser} listings={favoriteListings} />
  );
}
