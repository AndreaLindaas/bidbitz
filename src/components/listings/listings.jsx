import { useEffect } from "react";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import Listing from "../listing/listing";
import PropTypes from "prop-types";
Listings.propTypes = {
  searchWord: PropTypes.string,
  limit: PropTypes.number,
};
export default function Listings(props) {
  const [listings, setListings] = useState([]);
  const { searchWord, limit } = props;

  useEffect(() => {
    fetch(
      `${API_URL}/listings/?_bids=true&limit=${
        limit ? limit : 10
      }&sort=endsAt&sortOrder=asc&_active=true`,
      {}
    )
      .then((response) => response.json())
      .then((listings) => {
        setListings(listings);
      });
  }, []);
  const renderListings = () => {
    return listings.map((listing) => {
      if (searchWord) {
        if (listing.title.toLowerCase().includes(searchWord.toLowerCase())) {
          return <Listing listing={listing} key={listing.id} />;
        }
      } else {
        return <Listing listing={listing} key={listing.id} />;
      }
    });
  };
  return <>{renderListings()}</>;
}
