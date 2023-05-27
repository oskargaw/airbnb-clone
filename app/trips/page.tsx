import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";

import EmptyState from "../components/EmptyState";
import TripsClient from "../components/trips/TripsClient";

export default async function TripsPage() {
  // Actions
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const reservations = await getReservations({ userId: currentUser.id });

  if (reservations.length === 0) {
    <EmptyState
      title="No trips found"
      subtitle="Looks like you haven't reserved any trips"
    />;
  }

  return <TripsClient currentUser={currentUser} reservations={reservations} />;
}
