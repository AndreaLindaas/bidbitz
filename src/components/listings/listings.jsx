import { useEffect } from "react";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import Listing from "../listing/listing";
import PropTypes from "prop-types";
import "./listings.scss";
Listings.propTypes = {
  searchWord: PropTypes.string,
  limit: PropTypes.number,
  sortByFilter: PropTypes.string,
  sortOrderFilter: PropTypes.string,
};
export default function Listings(props) {
  const [listings, setListings] = useState([]);
  const { searchWord, limit, sortByFilter, sortOrderFilter } = props;

  useEffect(() => {
    fetch(
      `${API_URL}/listings/?_bids=true&limit=${limit ? limit : 10}&sort=${
        sortByFilter ? sortByFilter : "endsAt"
      }&sortOrder=${sortOrderFilter ? sortOrderFilter : "asc"}&_active=true`,
      {}
    )
      .then((response) => response.json())
      .then((listings) => {
        setListings(listings);
      });
  }, [sortByFilter, sortOrderFilter]);
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
  return <div className="listings-container">{renderListings()}</div>;
}
