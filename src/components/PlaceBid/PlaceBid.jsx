import { TextField } from "@mui/material";
import { Button } from "@mui/material";
export default function PlaceBid() {
  return (
    <>
      <TextField
        id="standard-basic"
        label="Amount"
        variant="standard"
        type="number"
      />
      <div>
        <Button className="primary bid-btn" variant="contained">
          Place bid
        </Button>
      </div>
    </>
  );
}
