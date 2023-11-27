import { useParams } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListingPage.scss";
import PlaceBid from "../../components/PlaceBid/PlaceBid";
import Moment from "react-moment";
import Carousel from "react-material-ui-carousel";

export default function ListingPage() {
  const [listing, setlisting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [highestBid, setHighestBid] = useState(0);
  const params = useParams();

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
        return <img src={image} key={i} />;
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
      setHighestBid(lastBid.amount);
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
    const bids = listing.bids.map((bid) => {
      return (
        <li key={bid.id}>
          <span className="single-bid">
            <span className="bold-credit"> {bid.amount} Credits</span>
            <span> {bid.bidderName}</span>
          </span>
          <span className="bid-date">
            <Moment format="hh:mm DD/MM/YYYY">{new Date().getTime()}</Moment>
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
    <div className="listing-container">
      <Carousel height={300}>{renderImages()}</Carousel>

      <h1>{listing.title}</h1>
      <div className="seller-container">
        <div className="seller-bold">Seller</div>
        <Link to="#">
          <div className="seller">
            <img src={sellerImage()} alt="" />
            <div>{listing.seller.name}</div>
          </div>
        </Link>
      </div>
      <div className="bid-ends">
        <div>{listing.endsAt}</div>
      </div>
      <div className="bid">
        <div className="highlight">
          {highestBid} <span> Credits</span>
        </div>
        <div className="highlight">
          {listing._count.bids} <span> Bids</span>
        </div>
        <PlaceBid highestBid={highestBid} />
      </div>
      <div className="description">
        <h2>Description</h2>
        <p>{listing.description}</p>
      </div>
      <div className="bids">
        <h3>All bids</h3>

        <ul>{allBids()}</ul>
      </div>
    </div>
  );
}
