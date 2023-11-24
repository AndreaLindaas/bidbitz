import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };
  if (accessToken) {
    return (
      <div>
        <nav>
          <Link to="/">
            <span className="logo">BidBitz</span>
          </Link>

          <div className="menu-bar" onClick={toggleMenu}>
            <MenuIcon />
          </div>

          <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
            <div className="menu-list">
              <div>
                <Link to="/">Home</Link>
              </div>
              <div>
                <Link to="/profile">Profile</Link>
              </div>
              <div>
                <Link to="/all-listings">Listings</Link>
              </div>

              <div>
                <Link to="/create">Sell items</Link>
              </div>
              <div>
                <Link to="/logout">Logout</Link>
              </div>
            </div>
          </Drawer>
        </nav>
      </div>
    );
  } else {
    return (
      <div>
        <nav>
          <Link to="/">
            <span className="logo">BidBitz</span>
          </Link>

          <div className="menu-bar" onClick={toggleMenu}>
            <MenuIcon />
          </div>
          <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
            <div className="menu-list">
              <div>
                <Link to="/login">Login</Link>
              </div>
              <div>
                <Link to="/">Home</Link>
              </div>
            </div>
          </Drawer>
        </nav>
      </div>
    );
  }
}
