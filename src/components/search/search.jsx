import { TextField } from "@mui/material";
import PropTypes from "prop-types";
Search.propTypes = {
  doSearch: PropTypes.func,
};
export default function Search(props) {
  const { doSearch } = props;
  const preformSearch = (event) => {
    const search = event.target.value;
    doSearch(search);
  };
  return (
    <>
      <TextField
        name="search"
        id="outlined-basic"
        label="Filter"
        variant="outlined"
        onKeyUp={preformSearch}
      />
    </>
  );
}
