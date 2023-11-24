import "./Home.scss";
import { useEffect, useState } from "react";
import Listings from "../../components/listings/listings";
import { API_URL } from "../../lib/constants";
import Search from "../../components/search/search";

export default function Home() {
  const [info, setInfo] = useState({});
  const name = localStorage.getItem("name");
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    fetch(`${API_URL}/profiles/${name}?_listings=true`, {
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((l) => {
        setInfo(l);
      });
  }, []);

  const showInfoOnHomePage = () => {
    if (accessToken) {
      return (
        <>
          <div className="info-home">
            <div>Hello {info.name}</div>
            <div> You have {info.credits} credits</div>
          </div>
        </>
      );
    }
    return;
  };

  return (
    <>
      <div className="introduction-container">
        <p>Bidding with a bit of fun</p>
        <h1>BidBitz</h1>
        <p>
          Welcome to BidBits- the simple and fun way to buy and sell items
          online. You can find items in allmost all catagories, from small beads
          to your new house. Not into buying?Sell almost anything you want!
        </p>
      </div>
      <div>{showInfoOnHomePage()}</div>
      <div className="listings-container">
        <Search />
        <Listings />
      </div>
    </>
  );
}
