import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import Listing from "../../components/listing/listing";
import "./OtherProfiles.scss";
export default function OtherProfiles() {
  const params = useParams();
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    fetch(`${API_URL}/profiles/${params.username}?_listings=true`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setProfile(result);
        setIsLoading(false);
      });
  }, []);
  const profileImage = () => {
    if (profile.avatar) {
      return profile.avatar;
    }
  };

  const renderListings = () => {
    return profile.listings.map((listing) => {
      return (
        <div className="relative" key={listing.id}>
          <Listing listing={listing} />
        </div>
      );
    });
  };
  const showWins = () => {
    const wins = profile.wins.length;
    return wins;
  };
  const numberOfAuctions = () => {
    return (
      <h2>
        {profile.name} has{" "}
        <span className="highlight">{profile._count.listings}</span> auctions
      </h2>
    );
  };
  if (isLoading) {
    return (
      <div className="spinner">
        <CircularProgress />
      </div>
    );
  }
  return (
    <>
      <Card className="profile-card">
        <Avatar alt="" src={profileImage()} sx={{ width: 70, height: 70 }} />
        <CardContent>
          <Typography
            className="name"
            gutterBottom
            variant="h5"
            component="div"
          >
            {profile.name}
          </Typography>

          <div className="credit-won">
            <Typography variant="body2" color="text.secondary">
              Contact
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Won
            </Typography>
          </div>
          <div className="credit-won-result">
            <Typography variant="body2" color="text.secondary">
              <a href={"mailto:" + profile.email} className="highlight">
                Email
              </a>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {showWins()}
            </Typography>
          </div>
        </CardContent>
      </Card>

      <div className="other-profile-auctions">
        <div>{numberOfAuctions()}</div>
      </div>

      <div className="listings-container">{renderListings()}</div>
    </>
  );
}
