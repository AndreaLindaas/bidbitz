import { useEffect } from "react";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import Listing from "../listing/listing";
import PropTypes from "prop-types";

import "./listings.scss";
import { CircularProgress, Button } from "@mui/material";
Listings.propTypes = {
  searchWord: PropTypes.string,
  sortByFilter: PropTypes.string,
  sortOrderFilter: PropTypes.string,
};
export default function Listings(props) {
  const [listings, setListings] = useState([]);
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const { searchWord, sortByFilter, sortOrderFilter, limit } = props;

  useEffect(() => {
    fetch(
      `${API_URL}/listings/?_bids=true&limit=${limit}&offset=${offset}&sort=${
        sortByFilter ? sortByFilter : "endsAt"
      }&sortOrder=${sortOrderFilter ? sortOrderFilter : "asc"}&_active=true`,
      {}
    )
      .then((response) => response.json())
      .then((newListings) => {
        setListings(newListings);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, [sortByFilter, sortOrderFilter, limit]);

  useEffect(() => {
    fetch(
      `${API_URL}/listings/?_bids=true&limit=${limit}&offset=${offset}&sort=${
        sortByFilter ? sortByFilter : "endsAt"
      }&sortOrder=${sortOrderFilter ? sortOrderFilter : "asc"}&_active=true`,
      {}
    )
      .then((response) => response.json())
      .then((newListings) => {
        setListings([...listings, ...newListings]);
        setIsLoading(false);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, [offset]);

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
  const showMore = () => {
    setOffset(offset + limit);
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
  return (
    <>
      <div className="listings-container">{renderListings()}</div>
      <div className="see-more">
        <Button className="primary" onClick={showMore}>
          Show {limit} more
        </Button>
      </div>
    </>
  );
}
