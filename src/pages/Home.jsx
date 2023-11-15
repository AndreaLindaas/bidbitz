import { Button } from "@mui/material";
import "./Home.scss";
import MediaCard from "../components/card/card";
export default function Home() {
  return (
    <>
      <div className="sloagen-container">
        <p>Bidding with a bit of fun</p>
        <h1>BidBitz</h1>
        <p>
          Welcome to BidBits- the simple and fun way to buy and sell items
          online. You can find items in allmost all catagories, from small beads
          to your new house. Not into buying?Sell almost anything you want!
        </p>
      </div>
      <MediaCard />
    </>
  );
}
