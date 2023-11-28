import Search from "../../components/search/search";
import Listings from "../../components/listings/listings";
import { useState } from "react";
import Filter from "../../components/Filter/Filter";
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
      <Search doSearch={search} />
      <Filter sortBy={sortBy} sortOrder={sortOrder} />
      <Listings
        limit={100}
        searchWord={searchWord}
        sortByFilter={sortByFilter}
        sortOrderFilter={sortOrderFilter}
      />
    </>
  );
}
