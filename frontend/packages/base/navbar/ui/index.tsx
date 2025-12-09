import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Login } from "@app/base";

import { FaShoppingCart, FaTimes, FaBars } from "react-icons/fa";
import "./index.css";
import { Logo } from "@app/core";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <nav className="navbar">
            <NavLink to="/" className="navbar-logo">
                <img src={Logo} alt="Logo" />
            </NavLink>

            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="toggle menu">
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <NavLink to="/menu">MENU</NavLink>
                <NavLink to="/about">ABOUT US</NavLink>
                <NavLink to="/orders">ORDERS</NavLink>
                <div className="footer-content">
                    <p>nacho@email.com</p>
                    <p>+46 77 77 77</p>
                    <Login type={"admin"} />
                </div>
            </div>
            <NavLink to="/cart" className="navbar-cart">
                <FaShoppingCart />
            </NavLink>
        </nav>
    )
}