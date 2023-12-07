import "./EditListing.scss";
import { TextField, Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
export default function EditListing() {
  const navigate = useNavigate();
  const params = useParams();
  const [listing, setListing] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [media, setMedia] = useState([]);
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
        console.log(result);
        setShowEdit(true);
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
  return (
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
            />
            <Button
              type="submit"
              variant="contained"
              className="primary"
              size="small"
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
            />
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
            />

            <Button variant="contained" type="submit" className="primary">
              Save
            </Button>
          </form>
        </>
      )}
    </div>
  );
}
