import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { API_URL } from "../../lib/constants";
import { useNavigate } from "react-router-dom";
export default function CreateListing() {
  const navigate = useNavigate();
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
  return (
    <>
      <h1>Create Listing</h1>
      <form onSubmit={createTheListing}>
        <div>
          <TextField
            id="standard-basic"
            label="Image-url"
            variant="standard"
            type="text"
            name="imageUrl"
            required
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
          />
        </div>
        <div>Bid ends at:</div>
        <div>
          <TextField
            id="standard-basic"
            variant="standard"
            type="date"
            name="date"
            required
          />
        </div>
        <div>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </div>
      </form>
    </>
  );
}
