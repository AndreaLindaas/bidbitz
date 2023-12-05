import { TextField, Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./CreateListing.scss";
import { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { DatePicker } from "@mui/x-date-pickers";

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
      endsAt: date,
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
    const date = event.format("DD-MM-YYYY");
    setDatePreview(date);
  };

  return (
    <div className="create-listing">
      <Card variant="outlined">
        <h1>Create Listing</h1>
        <form onSubmit={addImage}>
          <div>
            <TextField
              id="filled-basic"
              label="Pictures"
              variant="filled"
              type="text"
              name="imageUrl"
              fullWidth
              margin="dense"
              multiline
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="primary"
            size="small"
          >
            Add
          </Button>
        </form>
        <ul className="show-media">{showMediaUrl()}</ul>
        <form onSubmit={createTheListing}>
          <div>
            <TextField
              id="filled-basic"
              label="Title"
              variant="filled"
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
              id="filled-multiline-static"
              label="Description"
              multiline
              rows={4}
              variant="filled"
              type="text"
              name="description"
              fullWidth
              margin="dense"
              onChange={previewDescription}
            />
          </div>
          <div className="bidend">Auction ends at:</div>
          <div>
            <DatePicker required onChange={dateDescription} />
            {/* <TextField
              id="filled-basic"
              variant="filled"
              type="date"
              name="date"
              required
              margin="dense"
             
            /> */}
          </div>
          <div className="btn-align">
            <Button variant="contained" type="submit" className="primary">
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
          <h2>Preview</h2>
          <Carousel height={300}>{previewImage()}</Carousel>
          <h2>{titlePreview}</h2>
          <div className="description-date">
            <p>{descriptionPreview}</p>

            <p>{datePreview}</p>
          </div>
        </Card>
      )}
    </div>
  );
}
