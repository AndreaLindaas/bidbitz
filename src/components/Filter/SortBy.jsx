import { TextField, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
SortBy.propTypes = {
  sortBy: PropTypes.func,
};
export default function SortBy(props) {
  const { sortBy } = props;
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
        onChange={sortByChanged}
        variant="filled"
        className="sort-filter"
      >
        {showSortByFilter()}
      </TextField>
    </>
  );
}
