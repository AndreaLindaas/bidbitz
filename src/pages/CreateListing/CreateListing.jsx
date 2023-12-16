import { TextField, Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./CreateListing.scss";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { DatePicker } from "@mui/x-date-pickers";
import moment from "moment";
import { Helmet } from "react-helmet";
export default function CreateListing() {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [titlePreview, setTitlePreview] = useState("");
  const [descriptionPreview, setDescriptionPreview] = useState("");
  const [datePreview, setDatePreview] = useState(null);
  const [descriptionCount, setDescriptionCount] = useState(0);
  const [titleCount, setTitleCount] = useState(0);
  const [showError, setShowError] = useState(false);
  const [imageUrlCount, setImageUrlCount] = useState(0);
  const createTheListing = (event) => {
    event.preventDefault();

    const { title, description } = event.target.elements;

    const payload = {
      title: title.value,
      media: media,
      description: description.value,
      endsAt: moment(datePreview).toDate(),
    };

    const accessToken = localStorage.getItem("access_token");
    fetch(`${API_URL}/listings`, {
      method: "POST",
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

  const validateForm = () => {
    if (descriptionCount > 280) {
      return false;
    }
    if (titleCount > 280) {
      return false;
    }
    if (titlePreview.length === 0 || titlePreview.length > 280) {
      return false;
    }

    if (!datePreview) {
      return false;
    }

    return true;
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
          <img src={url} alt="auction image" />
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
  const previewImage = (event) => {
    if (media && media.length > 0) {
      return media.map((image, i) => {
        return (
          <div className="slide" key={i}>
            <img src={image} alt="auction image" />
          </div>
        );
      });
    }
  };
  const previewTitle = (event) => {
    const title = event.target.value;
    setTitlePreview(title);
    setTitleCount(title.length);
  };
  const previewDescription = (event) => {
    const description = event.target.value;
    setDescriptionPreview(description);
    setDescriptionCount(description.length);
  };

  const dateDescription = (date) => {
    setDatePreview(date);
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
        Could not save your listing. Please try again.
      </div>
    );
  }
  return (
    <>
      <Helmet>
        <title>BidBitz - Create Listing</title>
        <meta
          name="description"
          content="Here you can create and sell your items."
        />
      </Helmet>
      <div className="create-listing">
        <Card variant="outlined">
          <h1>Create Listing</h1>
          <form onSubmit={addImage}>
            <div>
              <TextField
                aria-label="imageurl"
                label="Pictures"
                variant="filled"
                type="text"
                name="imageUrl"
                fullWidth
                margin="dense"
                multiline
                onChange={imageUrlOnChange}
              />
            </div>
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
          <ul className="show-media">{showMediaUrl()}</ul>
          <form onSubmit={createTheListing}>
            <div>
              <TextField
                aria-label="title"
                label="Title"
                variant="filled"
                type="text"
                name="title"
                required
                fullWidth
                margin="dense"
                onChange={previewTitle}
                multiline
              />
              <div className={titleCount > 280 ? "error" : ""}>
                {titleCount}/280
              </div>
            </div>
            <div>
              <TextField
                label="Description"
                aria-label="description"
                multiline
                rows={4}
                variant="filled"
                type="text"
                name="description"
                fullWidth
                margin="dense"
                onChange={previewDescription}
              />
              <div className={descriptionCount > 280 ? "error" : ""}>
                {descriptionCount}/280
              </div>
            </div>
            <div className="bidend">
              Auction ends at:
              <div>
                <DatePicker required onChange={dateDescription} />
              </div>
            </div>
            <div className="btn-align">
              <Button
                variant="contained"
                disabled={!validateForm()}
                type="submit"
                className="primary"
              >
                Save
              </Button>
            </div>
          </form>
        </Card>
        {(titlePreview ||
          descriptionPreview ||
          datePreview ||
          media.length > 0) && (
          <Card variant="outlined" className="preview">
            <div className="preview-content">
              <h2>Preview</h2>
              <Carousel className="carousel" height={300}>
                {previewImage()}
              </Carousel>
              <h2>{titlePreview}</h2>
              <div className="description-date">
                <p>{descriptionPreview}</p>

                <p>{datePreview && datePreview.format("DD-MM-YYYY")}</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
}
