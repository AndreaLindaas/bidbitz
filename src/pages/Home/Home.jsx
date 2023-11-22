import "./Home.scss";

import Listings from "../../components/listings/listings";
import PropTypes from "prop-types";
Home.propTypes = {
  kat: PropTypes.string,
};
export default function Home(props) {
  console.log(props.kat);
  return (
    <>
      <div className="introduction-container">
        <p>Bidding with a bit of fun</p>
        <h1>BidBitz</h1>
        <p>
          Welcome to BidBits- the simple and fun way to buy and sell items
          online. You can find items in allmost all catagories, from small beads
          to your new house. Not into buying?Sell almost anything you want!
        </p>
      </div>
      <div className="listings-container">
        <Listings />
      </div>
    </>
  );
}
