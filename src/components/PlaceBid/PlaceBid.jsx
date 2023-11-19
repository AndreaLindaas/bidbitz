import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function PlaceBid(props) {
  const userEmail = localStorage.getItem("user_email");

  console.log(props);
  const placeBidClicked = () => {
    console.log("halllooooo");
  };

  if (userEmail) {
    return (
      <>
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          type="number"
        />
        <div>
          <Button
            onClick={placeBidClicked}
            className="primary bid-btn"
            variant="contained"
          >
            Place bid
          </Button>
        </div>
      </>
    );
  }
  return (
    <>
      <div>Do you want to bid on this item? Login to place a bid!</div>
      <div>
        <Link to="/login">
          <Button className="primary bid-btn" variant="contained">
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}
