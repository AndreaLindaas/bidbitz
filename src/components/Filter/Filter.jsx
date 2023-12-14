import PropTypes from "prop-types";
import "./Filter.scss";
import SortOrder from "./SortOrder";
import SortBy from "./SortBy";
import SortLimit from "./SortLimit";
Filter.propTypes = {
  sortBy: PropTypes.func,
  sortOrder: PropTypes.func,
  sortLimit: PropTypes.func,
};
export default function Filter(props) {
  const { sortBy, sortOrder, sortLimit } = props;

  return (
    <>
      <SortBy sortBy={sortBy} />
      <SortOrder sortOrder={sortOrder} />
      <SortLimit sortLimit={sortLimit} />
    </>
  );
}
