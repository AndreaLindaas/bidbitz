import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PropTypes from "prop-types";
import { useState } from "react";
import Typography from "@mui/material/Typography";
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
    console.log(lastBid);
    if (lastBid) {
      return <div>{lastBid.amount} Credits</div>;
    }
    return null;
  };
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={listing.media}
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
  );
}
