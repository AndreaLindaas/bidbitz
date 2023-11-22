import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { API_URL } from "../../lib/constants";
import { useEffect } from "react";
import { useState } from "react";
import "./Profile.scss";
import Listing from "../../components/listing/listing";

export default function Profile() {
  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isInputVisible, setIsInputVisible] = useState(false);
  useEffect(() => {
    const name = localStorage.getItem("name");
    const accessToken = localStorage.getItem("access_token");

    fetch(`${API_URL}/profiles/${name}?_listings=true`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((l) => {
        setProfile(l);
        setIsLoading(false);
        console.log(l);
      });
  }, []);
  const profileImage = () => {
    if (profile.avatar) {
      return profile.avatar;
    }
    return "https://www.kindpng.com/picc/m/9-93879_computer-icons-user-image-person-silhouette-user-silhouettes.png";
  };
  const showWins = () => {
    const wins = profile.wins.length;
    return wins;
  };

  const renderMyListings = () => {
    return profile.listings.map((listing) => {
      return <Listing listing={listing} key={listing.id} />;
    });
  };

  const showInput = () => {
    console.log("hei");
  };

  if (isLoading) {
    return <div></div>;
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <Avatar alt="" src={profileImage()} sx={{ width: 70, height: 70 }} />
        <CardContent>
          <Typography
            className="name"
            gutterBottom
            variant="h5"
            component="div"
            kat={profile.name}
          >
            {profile.name}
          </Typography>
          <Button variant="contained" size="small" onClick={showInput}>
            Change Avatar
          </Button>

          <div className="credit-won">
            <Typography variant="body2" color="text.secondary">
              Credits
            </Typography>

            <Typography variant="body2" color="text.secondary">
              Won
            </Typography>
          </div>
          <div className="credit-won-result">
            <Typography variant="body2" color="text.secondary">
              {profile.credits}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {showWins()}
            </Typography>
          </div>
        </CardContent>
      </Card>
      {renderMyListings()}
    </>
  );
}
