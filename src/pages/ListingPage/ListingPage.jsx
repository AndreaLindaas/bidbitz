import { useParams } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListingPage.scss";
import PlaceBid from "../../components/PlaceBid/PlaceBid";
import Moment from "react-moment";
import Carousel from "react-material-ui-carousel";
import { Gavel } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { Helmet } from "react-helmet";
export default function ListingPage() {
  const [listing, setlisting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [highestBid, setHighestBid] = useState({});
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
      });
  }, []);

  useEffect(() => {
    lastBid();
  }, [listing]);

  const renderImages = () => {
    if (listing.media && listing.media.length > 0) {
      return listing.media.map((image, i) => {
        return (
          <div className="slide" key={i}>
            <img src={image} />
          </div>
        );
      });
    }
    return (
      <div>
        <img src="https://www.crazychap.com/uploads/no-banner.jpg" />
      </div>
    );
  };

  const lastBid = () => {
    if (!listing.bids) {
      return null;
    }
    const lastBid = listing.bids[listing.bids.length - 1];

    if (lastBid) {
      setHighestBid(lastBid);
      return (
        <div>
          <span className="cb-color">Current Bid:</span>
          <span className="credit-nr"> {lastBid.amount} Credits</span>
        </div>
      );
    }
    return null;
  };

  const allBids = () => {
    if (!listing.bids || listing.bids.length == 0) {
      return <div className="no-bids">There are no bids yet</div>;
    }
    const bids = listing.bids.map((bid) => {
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
    return bids.reverse();
  };

  const sellerImage = () => {
    if (listing.seller.avatar) {
      return listing.seller.avatar;
    }
    return "https://www.crazychap.com/uploads/no-banner.jpg";
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Helmet>
        <title>BidBitz - {listing.title}</title>
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
              <div>Ends at</div>
              <Moment format="HH:mm DD.MM.YYYY">{listing.endsAt}</Moment>
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
              <Link to="#">
                <div className="seller">
                  <img src={sellerImage()} alt="" />
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
