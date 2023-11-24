import Search from "../../components/search/search";
import Listings from "../../components/listings/listings";
import { useState } from "react";
export default function AllListings() {
  const [searchWord, setSearchWord] = useState("");
  const search = (searchWord) => {
    setSearchWord(searchWord);
  };
  return (
    <>
      <Search doSearch={search} />
      <Listings limit={100} searchWord={searchWord} />
    </>
  );
}
