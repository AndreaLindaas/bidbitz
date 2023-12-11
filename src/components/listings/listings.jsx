import { useEffect } from "react";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import Listing from "../listing/listing";
import PropTypes from "prop-types";
import "./listings.scss";
import { CircularProgress } from "@mui/material";
Listings.propTypes = {
  searchWord: PropTypes.string,
  limit: PropTypes.number,
  sortByFilter: PropTypes.string,
  sortOrderFilter: PropTypes.string,
  offset: PropTypes.number,
};
export default function Listings(props) {
  const [listings, setListings] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const { searchWord, limit, sortByFilter, sortOrderFilter, offset } = props;

  useEffect(() => {
    fetch(
      `${API_URL}/listings/?_bids=true&limit=${limit ? limit : 10}&offset=${
        offset ? offset : 0
      }&sort=${sortByFilter ? sortByFilter : "endsAt"}&sortOrder=${
        sortOrderFilter ? sortOrderFilter : "asc"
      }&_active=true`,
      {}
    )
      .then((response) => response.json())
      .then((newListings) => {
        setListings([...listings, ...newListings]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setShowError(true);
      });
  }, [sortByFilter, sortOrderFilter, offset]);

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
  if (showError) {
    return <div className="error-message">Problem with fetching listings.</div>;
  }

  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
  return <div className="listings-container">{renderListings()}</div>;
}
