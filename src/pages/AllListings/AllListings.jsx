import Search from "../../components/search/search";
import Listings from "../../components/listings/listings";
import { useEffect, useState } from "react";
import Filter from "../../components/Filter/Filter";
import "./AllListings.scss";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
export default function AllListings() {
  const [searchWord, setSearchWord] = useState("");
  const [sortByFilter, setSortByFilter] = useState("endsAt");
  const [sortOrderFilter, setSortOrderFilter] = useState("asc");
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(40);
  const search = (searchWord) => {
    setSearchWord(searchWord);
  };
  const sortBy = (selectedSortByFilter) => {
    setSortByFilter(selectedSortByFilter);
  };
  const sortOrder = (selectedSortOrderFilter) => {
    setSortOrderFilter(selectedSortOrderFilter);
  };
  const showMore = () => {
    setOffset(offset + limit);
  };

  useEffect(() => {}, [offset]);
  return (
    <>
      <Helmet>
        <title>BidBitz - All Auctions</title>
      </Helmet>
      <div className="filter-container">
        <div className="search">
          <Search doSearch={search} />
        </div>
        <div className="filter">
          <Filter sortBy={sortBy} sortOrder={sortOrder} />
        </div>
      </div>
      <Listings
        limit={limit}
        offset={offset}
        searchWord={searchWord}
        sortByFilter={sortByFilter}
        sortOrderFilter={sortOrderFilter}
      />
      <div className="see-more">
        <Button className="primary" onClick={showMore}>
          Show {limit} more
        </Button>
      </div>
    </>
  );
}
