import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
export default function PlaceBid(props) {
  const userEmail = localStorage.getItem("user_email");
  const accessToken = localStorage.getItem("access_token");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  const placeBidClicked = async (event) => {
    event.preventDefault();
    const amount = event.target.elements;
    const bidAmount = amount.amount.value;
    console.log(props);

    try {
      const res = await fetch(`${API_URL}/listings/${params.listingId}/bids`, {
        method: "POST",
        body: JSON.stringify({ amount: parseFloat(bidAmount) }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await res.json();

      if (data.statusCode > 300) {
        setErrorMessage(data.errors[0].message);
      } else {
        navigate("#");
      }
    } catch (error) {
      console.warn("An error occurred", error);
    }
    if (bidAmount > props) {
      bidAmount;
    }
    return <div>Amount to small</div>;
  };

  if (userEmail) {
    return (
      <>
        <form onSubmit={placeBidClicked}>
          <TextField
            id="standard-basic"
            label="Amount"
            name="amount"
            variant="standard"
            type="number"
          />
          <div>
            <Button
              className="primary bid-btn"
              variant="contained"
              type="submit"
            >
              Place bid
            </Button>
          </div>
        </form>
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
      {errorMessage}
    </>
  );
}
