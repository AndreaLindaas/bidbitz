import { useParams } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ListingPage.scss";
import PlaceBid from "../../components/placeBid/placeBid";

useEffect;
export default function ListingPage() {
  const [listing, setlisting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  console.log(params.listingId);
  useEffect(() => {
    fetch(`${API_URL}/listings/${params.listingId}/?_bids=true&_seller=true`)
      .then((response) => response.json())
      .then((l) => {
        console.log(l);
        setlisting(l);
        setIsLoading(false);
      });
  }, []);
  const showMainImage = () => {
    if (listing.media && listing.media.length > 0) {
      return listing.media[0];
    }
    return "https://www.crazychap.com/uploads/no-banner.jpg";
  };
  const lastBid = () => {
    if (!listing.bids) {
      return null;
    }
    const lastBid = listing.bids[listing.bids.length - 1];

    if (lastBid) {
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
          {bid.created}
          {bid.amount} Credits
        </li>
      );
    });
    return bids.reverse();
  };

  if (isLoading) {
    return <div></div>;
  }
  const sellerImage = () => {
    if (listing.seller.avatar) {
      return listing.seller.avatar;
    }
    return "https://www.crazychap.com/uploads/no-banner.jpg";
  };
  return (
    <div className="listing-container">
      <img src={showMainImage()} alt="" />
      <h1>{listing.title}</h1>
      <div className="bid-ends">
        <div>{listing.endsAt}</div>
      </div>
      <div className="bid">
        <div>{lastBid()}</div>
        <div>{listing._count.bids} Bids</div>
        <PlaceBid />
      </div>
      <div>
        <img src={sellerImage()} alt="" />
        <div>{listing.seller.name}</div>
        <Link to="#">View sellers profile</Link>
      </div>
      <h3>Description</h3>
      <p>{listing.description}</p>
      <div>
        <h3>All bids</h3>
        <ul>{allBids()}</ul>
      </div>
    </div>
  );
}
