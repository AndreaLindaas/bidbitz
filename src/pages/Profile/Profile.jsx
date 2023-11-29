import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Avatar, Box, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { API_URL } from "../../lib/constants";
import { useEffect } from "react";
import { useState } from "react";
import "./Profile.scss";
import Listing from "../../components/listing/listing";
import { useNavigate } from "react-router-dom";
export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({});
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangeModalAvatarOpen, setIsChangeModalAvatarOpen] = useState(false);
  const [newProfileAvatar, setNewProfileAvatar] = useState("");
  useEffect(() => {
    const name = localStorage.getItem("name");
    const accessToken = localStorage.getItem("access_token");

    fetch(`${API_URL}/profiles/${name}`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((l) => {
        setProfile(l);
        setNewProfileAvatar(l.avatar);

        fetch(`${API_URL}/profiles/${name}/listings/?_bids=true`, {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
            Authorization: `Bearer ${accessToken}`,
          },
        })
          .then((response) => response.json())
          .then((a) => {
            setListings(a);
            setIsLoading(false);
          });
      });
  }, []);
  const profileImage = () => {
    if (profile.avatar) {
      return profile.avatar;
    }
    return "https://www.kindpng.com/picc/m/9-93879_computer-icons-user-image-person-silhouette-user-silhouettes.png";
  };
  const avatarModalOpen = () => {
    setIsChangeModalAvatarOpen(true);
  };
  const avatarModalClose = () => {
    setIsChangeModalAvatarOpen(false);
  };
  const showWins = () => {
    const wins = profile.wins.length;
    return wins;
  };
  // const editListing = () => {
  //   console.log("hei");
  // };
  const renderMyListings = () => {
    return listings.map((listing) => {
      return (
        <div key={listing.id}>
          <Listing listing={listing} />
          {/* <Button variant="contained" size="small" onClick={editListing()}>
            Edit
          </Button>
          <Button variant="contained" size="small">
            Delete
          </Button> */}
        </div>
      );
    });
  };

  const avatarUrlChanged = (event) => {
    setNewProfileAvatar(event.target.value);
  };

  const changeAvatarUrl = (event) => {
    event.preventDefault();
    const urlChange = event.target.elements.urlChange;

    const payload = {
      avatar: urlChange.value,
    };

    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/profiles/${profile.name}/media`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        localStorage.setItem("avatar", result.avatar);
        window.location.reload();
      })
      .catch((error) => {
        console.log("noe gikk galt", error);
      });
  };

  if (isLoading) {
    return <div></div>;
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
          <Button variant="contained" size="small" onClick={avatarModalOpen}>
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
      <div className="listings-container">{renderMyListings()}</div>
      <Modal
        open={isChangeModalAvatarOpen}
        onClose={avatarModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Change Avatar
          </Typography>
          <Avatar
            alt=""
            src={newProfileAvatar}
            sx={{ width: 70, height: 70 }}
          />
          <form onSubmit={changeAvatarUrl}>
            <TextField
              onChange={avatarUrlChanged}
              id="standard-basic"
              label="Avatar url"
              type="text"
              variant="standard"
              fullWidth
              name="urlChange"
              defaultValue={profile.avatar}
            />

            <div>
              <Button type="submit" variant="contained" size="small">
                Change Avatar
              </Button>

              <Button
                variant="contained"
                className="secondary"
                size="small"
                onClick={avatarModalClose}
              >
                Close
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </>
  );
}
