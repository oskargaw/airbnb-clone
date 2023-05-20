import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ListingClient from "@/app/components/listings/ListingClient";

interface Params {
  listingId?: string;
}

export default async function ListingPage({ params }: { params: Params }) {
  // Actions
  const currentUser = await getCurrentUser();
  const listing = await getListingById(params);

  if (!listing) {
    return <EmptyState />;
  }

  return (
    <div>
      <ListingClient listing={listing} currentUser={currentUser} />
    </div>
  );
}
