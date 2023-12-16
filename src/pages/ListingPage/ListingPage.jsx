import { useParams } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListingPage.scss";
import PlaceBid from "../../components/PlaceBid/PlaceBid";
import Moment from "react-moment";
import Carousel from "react-material-ui-carousel";
import { Gavel } from "@mui/icons-material";
import { useMediaQuery, Avatar, CircularProgress } from "@mui/material";
import { Helmet } from "react-helmet";
import Timer from "../../components/Timer/Timer";

export default function ListingPage() {
  const [listing, setlisting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [highestBid, setHighestBid] = useState({});
  const [showError, setShowError] = useState(false);
  const [sortedBidList, setSortedBidList] = useState([]);
  const params = useParams();
  const email = localStorage.getItem("user_email");
  const name = localStorage.getItem("name");
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    fetch(`${API_URL}/listings/${params.listingId}/?_bids=true&_seller=true`)
      .then((response) => response.json())
      .then((l) => {
        setlisting(l);

        setIsLoading(false);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, []);

  useEffect(() => {
    sortBids();
  }, [listing]);

  const renderImages = () => {
    if (listing.media && listing.media.length > 0) {
      return listing.media.map((image, i) => {
        return (
          <div className="slide" key={i}>
            <img src={image} alt="auction image" />
          </div>
        );
      });
    }
    return <div className="no-image">This listing does not have any image</div>;
  };

  const sortBids = () => {
    if (!listing.bids) {
      return null;
    }
    const sortedBids = listing.bids.sort((a, b) => b.amount - a.amount);
    setSortedBidList(sortedBids);
    const bid = sortedBids[0];

    if (bid) {
      setHighestBid(bid);
      return (
        <div>
          <span className="cb-color">Current Bid:</span>
          <span className="credit-nr"> {bid.amount} Credits</span>
        </div>
      );
    }
    return null;
  };

  const allBids = () => {
    if (!listing.bids || listing.bids.length == 0) {
      return <div className="no-bids">There are no bids yet</div>;
    }

    const bids = sortedBidList.map((bid) => {
      return (
        <li className={bid.bidderName == name ? "user" : ""} key={bid.id}>
          <span className="single-bid">
            <span className="bold-credit"> {bid.amount} Credits</span>
            <span className="name"> {bid.bidderName}</span>
          </span>
          <span className="bid-date">
            <Moment format="HH:mm DD.MM.YYYY">{bid.created}</Moment>
          </span>
        </li>
      );
    });
    return bids;
  };

  const sellerUrl = () => {
    if (listing.seller.name == name) {
      return `/profile`;
    }

    return `/profile/${listing.seller.name}`;
  };

  const sellerImage = () => {
    if (listing.seller.avatar) {
      return listing.seller.avatar;
    }
  };

  if (showError) {
    return (
      <div className="error-message">
        Problem with fetching listing. Please try again.
      </div>
    );
  }
  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>BidBitz - {listing.title}</title>
        <meta name="description" content={"bid on " + listing.title} />
      </Helmet>

      <div className="listing-container">
        {isDesktop && <h1>{listing.title}</h1>}
        <div className="content-container">
          <div>
            <Carousel className="carousel" height={300}>
              {renderImages()}
            </Carousel>
            {isDesktop && (
              <div className="description">
                <h2>Description</h2>
                <p>{listing.description}</p>
              </div>
            )}
          </div>
          <div className="content-flex">
            {!isDesktop && <h1>{listing.title}</h1>}

            <div className="bid-ends">
              <Timer endsAt={listing.endsAt} />
            </div>
            <div className="bid">
              <Gavel />
              <div className="highlight">
                {highestBid.amount} <span> credits</span>
              </div>
              <div className="highlight">
                {listing._count.bids}{" "}
                <span>{listing._count.bids == 1 ? "bid" : "bids"} </span>
              </div>
              {listing.seller.email !== email && (
                <PlaceBid highestBid={highestBid} />
              )}
            </div>
            <div className="seller-container">
              <div className="seller-bold">Seller</div>

              <Link to={sellerUrl()}>
                <div className="seller">
                  <Avatar src={sellerImage()} alt="profile image" />
                  <div className="highlight">{listing.seller.name}</div>
                </div>
              </Link>
            </div>
            {isDesktop && (
              <div className="bids">
                <h3>All bids</h3>
                <ul>{allBids()}</ul>
              </div>
            )}
          </div>
        </div>

        <div className="description">
          {!isDesktop && (
            <>
              <h2>Description</h2>
              <p>{listing.description}</p>
            </>
          )}
        </div>
        {!isDesktop && (
          <div className="bids">
            <h3>All bids</h3>
            <ul>{allBids()}</ul>
          </div>
        )}
      </div>
    </>
  );
}
