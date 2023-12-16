import Search from "../../components/search/search";
import Listings from "../../components/listings/listings";
import { useState } from "react";
import Filter from "../../components/Filter/Filter";
import "./AllListings.scss";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
export default function AllListings() {
  const [searchWord, setSearchWord] = useState("");
  const [sortByFilter, setSortByFilter] = useState("endsAt");
  const [sortOrderFilter, setSortOrderFilter] = useState("asc");
  const [limitFilter, setLimitFilter] = useState(10);
  const search = (searchWord) => {
    setSearchWord(searchWord);
  };
  const sortBy = (selectedSortByFilter) => {
    setSortByFilter(selectedSortByFilter);
  };
  const sortOrder = (selectedSortOrderFilter) => {
    setSortOrderFilter(selectedSortOrderFilter);
  };

  const sortLimit = (selectedLimit) => {
    setLimitFilter(selectedLimit);
  };
  return (
    <>
      <Helmet>
        <title>BidBitz - All Auctions</title>{" "}
        <meta name="description" content="Here you can see all listings" />
      </Helmet>
      <div className="filter-container">
        <div className="search">
          <Search doSearch={search} />
        </div>
        <div className="filter">
          <Filter sortLimit={sortLimit} sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      </div>
      <Listings
        searchWord={searchWord}
        sortByFilter={sortByFilter}
        sortOrderFilter={sortOrderFilter}
        limit={limitFilter}
      />
    </>
  );
}
