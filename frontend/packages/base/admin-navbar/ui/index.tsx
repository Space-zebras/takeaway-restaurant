import { useState } from "react";
import { NavLink } from "react-router-dom";

import { FaTimes, FaBars } from "react-icons/fa";
import "./index.css";
import { Logo } from "@app/core";

export function AdminNavbar() {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <nav className="navbar">
      <NavLink to="/admin" className="navbar-logo">
        <img src={Logo} alt="Logo" />
      </NavLink>

      <button
        className="navbar-hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="toggle menu"
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/admin/orders-page">ORDERS</NavLink>
        <NavLink to="/admin/menu-page">EDIT MENU</NavLink>
        <NavLink to="/admin/stock-page">STOCK</NavLink>
      </div>

      {/*Invisible item to replace cart-icon in normal navbar, so no effect on layout*/}
      <div style={{ opacity: 0 }}>Invisible content</div>
    </nav>
  );
}
