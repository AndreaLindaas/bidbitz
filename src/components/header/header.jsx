import { Link } from "react-router-dom";
import { Drawer } from "@mui/material";
import React, { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
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

  return (
    <div>
      <nav>
        <button onClick={toggleMenu}>Meny</button>
        <Drawer anchor="top" open={menuOpen} onClose={closeMenu}>
          <div>home</div>
          <div>Listings</div>
          <div>boble</div>
        </Drawer>
        <Link to="/login">Login</Link>
      </nav>
    </div>
  );
}
