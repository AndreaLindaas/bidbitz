import "./EditListing.scss";
import { TextField, Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
export default function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [listing, setListing] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [media, setMedia] = useState([]);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [imageUrlCount, setImageUrlCount] = useState(0);
  const accessToken = localStorage.getItem("access_token");
  useEffect(() => {
    fetch(`${API_URL}/listings/${params.listingId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setListing(result);
        setMedia(result.media);
        setTitleCount(result.title.length);
        setDescriptionCount(result.description.length);
        setShowEdit(true);
      })
      .catch((error) => {
        setShowError(true);
      });
  }, []);
  const editListing = (event) => {
    event.preventDefault();
    const { title, description } = event.target.elements;
    const payload = {
      media: media,
      title: title.value,
      description: description.value,
    };

    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/listings/${params.listingId}`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/listing/" + data.id);
      })
      .catch((error) => {
        setShowError(true);
      });
  };
  const addImage = (event) => {
    event.preventDefault();

    const { imageUrl } = event.target.elements;

    setMedia([...media, imageUrl.value]);
  };
  const removeItem = (event) => {
    const index = event.target.dataset.index;
    setMedia(media.filter((m, i) => i != index));
  };
  const showMediaUrl = () => {
    return media.map((url, i) => {
      return (
        <li key={i}>
          <img src={url} />
          <Button
            variant="contained"
            className="delete"
            data-index={i}
            size="small"
            onClick={removeItem}
          >
            delete
          </Button>
        </li>
      );
    });
  };
  const CountDescription = (event) => {
    const description = event.target.value;
    setDescriptionCount(description.length);
  };
  const countTitle = (event) => {
    const title = event.target.value;
    setTitleCount(title.length);
  };
  const validateForm = () => {
    if (descriptionCount > 280) {
      return false;
    }
    // if (titleCount > 280) {
    //   return false;
    // }
    if (titleCount === 0 || titleCount > 280) {
      return false;
    }
    return true;
  };
  const imageUrlOnChange = (event) => {
    const url = event.target.value;
    setImageUrlCount(url.length);
  };
  const validateUrlImage = () => {
    if (imageUrlCount > 4) {
      return true;
    }
    return false;
  };

  if (showError) {
    return (
      <div className="error-message">
        Something went wrong. Please try again.
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>BidBitz - Edit Listing</title>
        <meta name="description" content="Here you can edit your listings" />
      </Helmet>
      <div className="edit-listing">
        <h1>Edit Listing</h1>
        {showEdit && (
          <>
            <ul>{showMediaUrl()}</ul>
            <form onSubmit={addImage}>
              <TextField
                id="filled-basic"
                label="Url"
                variant="filled"
                type="text"
                name="imageUrl"
                fullWidth
                margin="dense"
                multiline
                onChange={imageUrlOnChange}
              />
              <Button
                type="submit"
                variant="contained"
                className="primary"
                size="small"
                disabled={!validateUrlImage()}
              >
                Add
              </Button>
            </form>
            <form onSubmit={editListing}>
              <TextField
                id="filled-basic"
                label="Title"
                variant="filled"
                type="text"
                name="title"
                fullWidth
                margin="dense"
                defaultValue={listing.title}
                onChange={countTitle}
                multiline
              />
              <div className={titleCount > 280 ? "error" : ""}>
                {titleCount}/280
              </div>
              <TextField
                id="filled-basic"
                label="Description"
                variant="filled"
                type="text"
                name="description"
                fullWidth
                margin="dense"
                defaultValue={listing.description}
                multiline
                onChange={CountDescription}
              />
              <div className={descriptionCount > 280 ? "error" : ""}>
                {descriptionCount}/280
              </div>
              <Button
                variant="contained"
                type="submit"
                className="primary"
                disabled={!validateForm()}
              >
                Save
              </Button>
            </form>
          </>
        )}
      </div>
    </>
  );
}
