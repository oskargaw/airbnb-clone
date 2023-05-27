import EmptyState from "../components/EmptyState";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import ReservationsClient from "../components/reservations/ReservationsClient";

export default async function ReservationsPage() {
  // Actions
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please log in" />;
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    <EmptyState
      title="No reservations found"
      subtitle="Looks like you have no reservations on your properties"
    />;
  }

  return (
    <ReservationsClient reservations={reservations} currentUser={currentUser} />
  );
}
