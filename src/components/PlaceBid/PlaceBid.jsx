import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { API_URL } from "../../lib/constants";
import PropTypes from "prop-types";
import { useState } from "react";
import { useParams } from "react-router-dom";
PlaceBid.propTypes = {
  highestBid: PropTypes.object,
};

export default function PlaceBid(props) {
  const userEmail = localStorage.getItem("user_email");
  const name = localStorage.getItem("name");
  const accessToken = localStorage.getItem("access_token");
  const [errorMessage, setErrorMessage] = useState("");
  const [isBidButtonDisabled, setIsBidButtonDisabled] = useState(true);
  const params = useParams();

  const placeBidClicked = async (event) => {
    event.preventDefault();
    const amount = event.target.elements;
    const bidAmount = amount.amount.value;

    if (bidAmount <= props.highestBid.amount) {
      return;
    }

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
        window.location.reload();
      }
    } catch (error) {
      setErrorMessage("something went wrong.");
    }
  };

  if (name != null && props.highestBid.bidderName == name) {
    return (
      <div className="winning">
        <span className="highlight">Hooray!</span> You are #winning
      </div>
    );
  }
  const amountOnChange = (event) => {
    const amount = event.target.value;

    if (
      (!props.highestBid.amount || amount > props.highestBid.amount) &&
      amount > 0
    ) {
      setIsBidButtonDisabled(false);
      setErrorMessage("");
    } else {
      setIsBidButtonDisabled(true);
      setErrorMessage("Your bid is too low");
    }
  };
  if (userEmail) {
    return (
      <>
        <form onSubmit={placeBidClicked}>
          <TextField
            id="filled-basic"
            label="Amount"
            name="amount"
            variant="filled"
            onChange={amountOnChange}
            type="number"
            className="bid-input"
          />
          <div
            className="error-message
          "
          >
            {errorMessage}
          </div>
          <div>
            <Button
              className="primary bid-btn"
              variant="contained"
              type="submit"
              disabled={isBidButtonDisabled}
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
      <div className="want-tobid">
        Do you want to bid on this item? Login to place a bid!
      </div>
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
