import { useParams } from "react-router-dom";
import { API_URL } from "../lib/constants";
import { useEffect, useState } from "react";
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
      return <div>{lastBid.amount} Credits</div>;
    }
    return null;
  };

  const allBids = () => {
    const bids = listing.bids.map((bid) => {
      return <li key={bid.id}>{bid.amount}</li>;
    });
    return bids.reverse();
  };

  if (isLoading) {
    return <div></div>;
  }
  return (
    <div>
      <img src={showMainImage()} alt="" />
      <h1>{listing.title}</h1>
      <div>{listing.endsAt}</div>
      <div>{lastBid()}</div>
      <div>{listing._count.bids} Bids</div>
      <p>{listing.description}</p>
      <div>
        <ul>{allBids()}</ul>
      </div>
    </div>
  );
}
