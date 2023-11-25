import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";
import { useMediaQuery } from "@mui/material";
export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const accessToken = localStorage.getItem("access_token");
  const isDesktop = useMediaQuery("(min-width:768px)");
  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };
  const renderMenuList = () => {
    return (
      <ul className="menu-list">
        {!accessToken && (
          <li>
            <Link to="/login">Login</Link>
          </li>
        )}
        <li>
          <Link to="/">Home</Link>
        </li>
        {accessToken && (
          <>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/all-listings">Listings</Link>
            </li>

            <li>
              <Link to="/create">Sell items</Link>
            </li>
            <li>
              <Link to="/logout">Logout</Link>
            </li>
          </>
        )}
      </ul>
    );
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div>
      <nav>
        <Link to="/">
          <span className="logo">BidBitz</span>
        </Link>

        {isDesktop && (
          <>
            <div className="menu-bar">{renderMenuList()}</div>
          </>
        )}

        {!isDesktop && (
          <>
            <div className="menu-bar" onClick={toggleMenu}>
              <MenuIcon />
            </div>

            <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
              <div className="menu-mobile" onClick={closeMenu}>
                {renderMenuList()}
              </div>
            </Drawer>
          </>
        )}
      </nav>
    </div>
  );
}
