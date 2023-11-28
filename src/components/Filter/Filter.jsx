import { TextField, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
import "./Filter.scss";
import SortOrder from "./SortOrder";
Filter.propTypes = {
  sortBy: PropTypes.func,
  sortOrder: PropTypes.func,
};
export default function Filter(props) {
  const { sortBy, sortOrder } = props;
  const showSortByFilter = () => {
    const sortItems = [
      {
        value: "created",
        label: "Created",
      },
      {
        value: "endsAt",
        label: "Ending",
      },
    ];
    return sortItems.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };
  const sortByChanged = (event) => {
    const filter = event.target.value;
    sortBy(filter);
  };

  return (
    <>
      <TextField
        id="outlined-select-currency"
        select
        defaultValue={"endsAt" || ""}
        label="Sort by"
        onChange={sortByChanged}
        className="filter"
      >
        {showSortByFilter()}
      </TextField>
      <SortOrder sortOrder={sortOrder} />
    </>
  );
}
