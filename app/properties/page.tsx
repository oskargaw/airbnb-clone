import getListings from "../actions/getListings";
import getCurrentUser from "../actions/getCurrentUser";

import EmptyState from "../components/EmptyState";
import PropertiesClient from "../components/properties/PropertiesClient";

export default async function PropertiesPage() {
  // Actions
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please login" />;
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    <EmptyState
      title="No properties found"
      subtitle="Looks like you have no properties"
    />;
  }

  return <PropertiesClient currentUser={currentUser} listings={listings} />;
}
