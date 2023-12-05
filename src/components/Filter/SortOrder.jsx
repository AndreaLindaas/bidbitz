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
        id="outlined-select-currency"
        select
        defaultValue={"asc" || ""}
        label="Sort order"
        onChange={sortOrderChanged}
        className="filter"
        variant="filled"
      >
        {showSortOrderFilter()}
      </TextField>
    </>
  );
}
