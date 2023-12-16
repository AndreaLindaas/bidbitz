import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
Listing.propTypes = {
  listing: PropTypes.object,
};
export default function Listing(props) {
  const { listing } = props;
  if (!listing) {
    return null;
  }

  const lastBid = () => {
    if (listing.bids) {
      const lastBid = listing.bids[listing.bids.length - 1];

      if (lastBid) {
        return (
          <span>
            <span className="highlight">{lastBid.amount}</span> Credits
          </span>
        );
      }
    }
    return null;
  };
  const getImage = () => {
    if (listing.media && listing.media.length > 0) {
      return <CardMedia image={listing.media[0]} />;
    }

    return <div className="no-image-avaliable">No image avaliable</div>;
  };

  return (
    <Link className="listing-link" to={`/listing/${listing.id}`}>
      <Card>
        {getImage()}
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listing.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastBid()}
          </Typography>
          {listing._count && (
            <Typography variant="body2" color="text.secondary">
              <span className="highlight"> {listing._count.bids} </span> Bids
            </Typography>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
