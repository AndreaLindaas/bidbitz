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

import { Link } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({});
  const [listings, setListings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isChangeModalAvatarOpen, setIsChangeModalAvatarOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
  const deleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };
  const deleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };
  // const deleteListing = () => {
  //   console.log("hei");
  //   const accessToken = localStorage.getItem("access_token");
  //   fetch(`${API_URL}/listings/${listing.id}`, {
  //     method: "Delete",
  //     headers: {
  //       Authorization: `Bearer ${accessToken}`,
  //     },
  //   }).then((response) => {
  //     if (response.status < 300) {
  //       // navigate({ to: "/" });
  //     }
  //   });
  // };
  const renderMyListings = () => {
    return listings.map((listing) => {
      console.log(listing);
      return (
        <div className="relative" key={listing.id}>
          <Listing listing={listing} />
          <div className="edit-delete-btn">
            <Link to={`/listing/edit/${listing.id}`}>
              <Button variant="contained" size="small" className="primary">
                Edit
              </Button>
            </Link>
            <Button
              variant="contained"
              size="small"
              className="delete"
              onClick={deleteModalOpen}
            >
              Delete
            </Button>
          </div>
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
  const myAuctions = () => {
    if (listings.length > 0) {
      return (
        <>
          <div className="my-auctions">
            <h2>
              Here are your <span className="highlight">{listings.length}</span>{" "}
              auctions
            </h2>
          </div>
        </>
      );
    }
    return (
      <>
        {" "}
        <div className="my-auctions">
          {" "}
          <h2>You have not made any auctions jet</h2>
        </div>
      </>
    );
  };
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
          <Button
            variant="contained"
            size="small"
            onClick={avatarModalOpen}
            className="primary"
          >
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
      <div> {myAuctions()}</div>
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
              id="filled-basic"
              type="text"
              variant="filled"
              fullWidth
              name="urlChange"
              defaultValue={profile.avatar}
              multiline
            />

            <div>
              <Button
                type="submit"
                variant="contained"
                size="small"
                className="primary"
              >
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
      <Modal
        open={isDeleteModalOpen}
        onClose={deleteModalClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="delete-modal">
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          <Button variant="contained" size="small" className="delete">
            Delete
          </Button>
        </Box>
      </Modal>
    </>
  );
}
