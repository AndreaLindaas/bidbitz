import PropTypes from "prop-types";
import "./Filter.scss";
import SortOrder from "./SortOrder";
import SortBy from "./SortBy";
Filter.propTypes = {
  sortBy: PropTypes.func,
  sortOrder: PropTypes.func,
};
export default function Filter(props) {
  const { sortBy, sortOrder } = props;

  return (
    <>
      <SortBy sortBy={sortBy} />
      <SortOrder sortOrder={sortOrder} />
    </>
  );
}
