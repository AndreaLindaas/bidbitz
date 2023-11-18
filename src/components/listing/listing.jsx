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
    const lastBid = listing.bids[listing.bids.length - 1];

    if (lastBid) {
      return <div>{lastBid.amount} Credits</div>;
    }
    return null;
  };
  const getImage = () => {
    if (listing.media && listing.media.length > 0) {
      return listing.media[0];
    }

    return "https://www.crazychap.com/uploads/no-banner.jpg";
  };

  return (
    <Link to={`/listing/${listing.id}`}>
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 140 }}
          image={getImage()}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {listing.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {lastBid()}

            <div>{listing._count.bids} Bids</div>
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
}
