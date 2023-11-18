import { useEffect } from "react";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import Listing from "../listing/listing";
export default function Listings() {
  const [listings, setListings] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/listings/?_bids=true`, {})
      .then((response) => response.json())
      .then((listings) => {
        setListings(listings);
      });
  }, []);
  const renderListings = () => {
    return listings.map((listing) => {
      return <Listing listing={listing} key={listing.id} />;
    });
  };
  return <>{renderListings()}</>;
}
