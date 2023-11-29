import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./CreateListing.scss";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";

export default function CreateListing() {
  const navigate = useNavigate();
  const [media, setMedia] = useState([]);
  const [titlePreview, setTitlePreview] = useState("");
  const [descriptionPreview, setDescriptionPreview] = useState("");
  const [datePreview, setDatePreview] = useState("");

  const createTheListing = (event) => {
    event.preventDefault();

    const { title, description, date } = event.target.elements;

    const payload = {
      title: title.value,
      media: media,
      description: description.value,
      endsAt: date.value,
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
        console.log("her er data", data);

        navigate("/listing/" + data.id);
      })
      .catch((error) => {
        console.log("noe gikk galt", error);
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
          {url}
          <Button
            variant="contained"
            className="secondary"
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
  const previewImage = () => {
    if (media && media.length > 0) {
      return media.map((image, i) => {
        return <img src={image} key={i} />;
      });
    }
  };
  const previewTitle = (event) => {
    const title = event.target.value;
    setTitlePreview(title);
  };
  const previewDescription = (event) => {
    const description = event.target.value;
    setDescriptionPreview(description);
  };
  const dateDescription = (event) => {
    const date = event.target.value;
    setDatePreview(date);
  };

  return (
    <>
      <h1>Create Listing</h1>
      <Card variant="outlined">
        <form onSubmit={addImage}>
          <div>
            <TextField
              id="standard-basic"
              label="Image-url"
              variant="standard"
              type="text"
              name="imageUrl"
              required
              fullWidth
              margin="dense"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="secondary"
            size="small"
          >
            Add
          </Button>
        </form>
        <ul>{showMediaUrl()}</ul>
        <form onSubmit={createTheListing}>
          <div>
            <TextField
              id="standard-basic"
              label="Title"
              variant="standard"
              type="text"
              name="title"
              required
              fullWidth
              margin="dense"
              onChange={previewTitle}
            />
          </div>
          <div>
            <TextField
              id="standard-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="standard"
              type="text"
              name="description"
              required
              fullWidth
              margin="dense"
              onChange={previewDescription}
            />
          </div>
          <div className="bidend">Bid ends at:</div>
          <div>
            <TextField
              id="standard-basic"
              variant="standard"
              type="date"
              name="date"
              required
              margin="dense"
              onChange={dateDescription}
            />
          </div>
          <div className="btn-align">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </div>
        </form>
      </Card>
      <Card variant="outlined" className="preview">
        {/* {previewImage()} */}
        <Carousel height={300}>{previewImage()}</Carousel>
        <h2>{titlePreview}</h2>
        <p>{descriptionPreview}</p>
        <p>{datePreview}</p>
      </Card>
    </>
  );
}
