import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import "./header.scss";
import { useMediaQuery } from "@mui/material";
import { Home, Person, Gavel, Logout, Login, Sell } from "@mui/icons-material";
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
            <Link to="/login" className="login-link">
              <span> Login</span>
              {!isDesktop && <Login />}
            </Link>
          </li>
        )}

        <li>
          <Link to="/">
            <span> Home</span>
            {!isDesktop && <Home />}
          </Link>
        </li>

        <li>
          <Link to="/all-listings">
            <span> All Auctions</span>
            {!isDesktop && <Gavel />}
          </Link>
        </li>

        {accessToken && (
          <>
            <li>
              <Link to="/profile">
                <span> Profile</span>
                {!isDesktop && <Person />}
              </Link>
            </li>

            <li>
              <Link to="/create">
                <span> Sell items</span>
                {!isDesktop && <Sell />}
              </Link>
            </li>
            <li>
              <Link to="/logout">
                <span> Logout</span>

                {!isDesktop && <Logout />}
              </Link>
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
