import { TextField, MenuItem } from "@mui/material";
import PropTypes from "prop-types";
SortOrder.propTypes = {
  sortOrder: PropTypes.func,
};
export default function SortOrder(props) {
  const { sortOrder } = props;
  const showSortOrderFilter = () => {
    const sortItems = [
      {
        value: "asc",
        label: "  ↑ Ascending",
      },
      {
        value: "desc",
        label: "   ↓ Descending",
      },
    ];
    return sortItems.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };
  const sortOrderChanged = (event) => {
    const filter = event.target.value;
    sortOrder(filter);
  };

  return (
    <>
      <TextField
        name="sortorder"
        select
        defaultValue={"asc" || ""}
        onChange={sortOrderChanged}
        className="sort-filter"
        variant="filled"
        aria-label="sortorder"
      >
        {showSortOrderFilter()}
      </TextField>
    </>
  );
}
