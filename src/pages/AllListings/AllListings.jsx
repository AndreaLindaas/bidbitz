import Search from "../../components/search/search";
import Listings from "../../components/listings/listings";
import { useState } from "react";
import Filter from "../../components/Filter/Filter";
import "./AllListings.scss";
export default function AllListings() {
  const [searchWord, setSearchWord] = useState("");
  const [sortByFilter, setSortByFilter] = useState("endsAt");
  const [sortOrderFilter, setSortOrderFilter] = useState("asc");
  const search = (searchWord) => {
    setSearchWord(searchWord);
  };
  const sortBy = (selectedSortByFilter) => {
    setSortByFilter(selectedSortByFilter);
  };
  const sortOrder = (selectedSortOrderFilter) => {
    setSortOrderFilter(selectedSortOrderFilter);
  };
  return (
    <>
      <div className="filter-container">
        <div className="search">
          <Search doSearch={search} />
        </div>
        <div className="filter">
          <Filter sortBy={sortBy} sortOrder={sortOrder} />{" "}
        </div>
      </div>
      <Listings
        limit={100}
        searchWord={searchWord}
        sortByFilter={sortByFilter}
        sortOrderFilter={sortOrderFilter}
      />
    </>
  );
}
