import { TextField, Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function EditListing() {
  const [inputValue, setInputValue] = useState({});
  const navigate = useNavigate();
  const params = useParams();

  const editListing = (event) => {
    event.preventDefault();
    const { url, title, description } = event.target.elements;
    const payload = {
      media: [url.value],
      title: title.value,
      description: description.value,
    };
    console.log(payload);
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
        console.log("Er det denne", inputValue);
        setInputValue(data);
        // navigate("/listing/" + data.id);
      });
  };

  return (
    <>
      <h1>Edit Listing</h1>
      <form onSubmit={editListing}>
        <TextField
          id="standard-basic"
          label="Url"
          variant="standard"
          type="text"
          name="url"
          fullWidth
          margin="dense"
        />
        <TextField
          id="standard-basic"
          label="Title"
          variant="standard"
          type="text"
          name="title"
          fullWidth
          margin="dense"
          required
          defaultValue={inputValue.title}
        />
        <TextField
          id="standard-basic"
          label="Description"
          variant="standard"
          type="text"
          name="description"
          fullWidth
          margin="dense"
        />

        <Button variant="contained" type="submit">
          Save
        </Button>
      </form>
    </>
  );
}
