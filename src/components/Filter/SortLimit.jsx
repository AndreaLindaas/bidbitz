import { TextField, MenuItem } from "@mui/material";

export default function SortLimit(props) {
  const { sortLimit } = props;
  const showSortLimitFilter = () => {
    const sortItems = [
      {
        value: 10,
        label: "10",
      },
      {
        value: 20,
        label: "20",
      },
      {
        value: 50,
        label: "50",
      },
      {
        value: 100,
        label: "100",
      },
    ];
    return sortItems.map((option) => (
      <MenuItem key={option.value} value={option.value}>
        {option.label}
      </MenuItem>
    ));
  };
  const sortLimitChanged = (event) => {
    const limit = event.target.value;
    sortLimit(limit);
  };
  return (
    <>
      <TextField
        select
        variant="filled"
        className="sort-filter limit"
        defaultValue={50}
        onChange={sortLimitChanged}
        name="limit"
        aria-label="limit"
      >
        {showSortLimitFilter()}
      </TextField>
    </>
  );
}
