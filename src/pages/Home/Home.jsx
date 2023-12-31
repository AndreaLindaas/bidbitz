import "./Home.scss";
import { useEffect, useState } from "react";
import Listings from "../../components/listings/listings";
import { API_URL } from "../../lib/constants";
import { Helmet } from "react-helmet";
import { useMediaQuery } from "@mui/material";
import AnimatedNumbers from "react-animated-numbers";

export default function Home() {
  const [info, setInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const name = localStorage.getItem("name");
  const accessToken = localStorage.getItem("access_token");
  const isDesktop = useMediaQuery("(min-width:768px)");

  useEffect(() => {
    if (name) {
      fetch(`${API_URL}/profiles/${name}?_listings=true`, {
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then((l) => {
          setInfo(l);
          setIsLoading(false);
        });
    }
  }, []);

  const showInfoOnHomePage = () => {
    if (accessToken && !isLoading) {
      return (
        <>
          <div className="info-home">
            <div>
              Hello <span className="highlight">{info.name}</span>
            </div>
            <div className="credits-container">
              You have
              <span className="highlight">
                <AnimatedNumbers
                  transitions={(index) => ({
                    type: "spring",
                    duration: index + 0.3,
                  })}
                  animateToNumber={info.credits}
                />
              </span>
              credits
            </div>
          </div>
        </>
      );
    }
    return;
  };

  return (
    <>
      <Helmet>
        <title>BidBitz</title>
        <meta
          name="description"
          content="Welcome to BidBits- the simple and fun way to buy and sell items online. You can find items in allmost all catagories, from small beads to your new house. Not into buying?Sell almost anything you want!"
        />
      </Helmet>
      <div className="introduction-container">
        {isDesktop && (
          <div className="auctionman-image">
            <img
              src="./assets/media/images/auction_man.png"
              alt="Bidbitz logo of an auction man"
            />
          </div>
        )}

        <div className="introduction">
          <p>Bidding with a bit of fun</p>
          <h1>BidBitz</h1>
          <p>
            Welcome to BidBits- the simple and fun way to buy and sell items
            online. You can find items in allmost all catagories, from small
            beads to your new house. Not into buying?Sell almost anything you
            want!
          </p>
        </div>
      </div>
      <div>{showInfoOnHomePage()}</div>
      <div className="hurry">
        <p>
          <span className="highlight skew-shake-y">Hurry up!</span> These items
          are ending soon.
        </p>
      </div>
      <Listings limit={10} />
    </>
  );
}
