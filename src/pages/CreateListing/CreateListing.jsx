import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
import { Card } from "@mui/material";
import "./CreateListing.scss";
import { useState } from "react";

export default function CreateListing() {
  const navigate = useNavigate();
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [titlePreview, setTitlePreview] = useState("");
  const [descriptionPreview, setDescriptionPreview] = useState("");
  const [datePreview, setDatePreview] = useState("");
  const createTheListing = (event) => {
    event.preventDefault();

    const { title, imageUrl, description, date } = event.target.elements;

    const payload = {
      title: title.value,
      media: [imageUrl.value],
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
  const previewImage = (event) => {
    const imageUrl = event.target.value;

    setImagePreviewUrl(imageUrl);
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
        <form onSubmit={createTheListing}>
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
              onChange={previewImage}
            />
          </div>
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
        <img src={imagePreviewUrl} alt="" />
        <h2>{titlePreview}</h2>
        <p>{descriptionPreview}</p>
        <p>{datePreview}</p>
      </Card>
    </>
  );
}
