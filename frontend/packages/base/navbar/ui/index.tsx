import { useState } from "react";
import { NavLink } from "react-router-dom";
import { CartIcon, Login } from "@app/base";

import { FaTimes, FaBars } from "react-icons/fa";
import "./index.css";
import { Logo } from "@app/core";

export function Navbar() {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);

    return (
        <nav className={`navbar ${menuOpen ? "menu-open" : ""}`}>
            <NavLink to="/" className="navbar-logo">
                <img src={Logo} alt="Logo" />
            </NavLink>

            <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label="toggle menu">
                {menuOpen ? <FaTimes /> : <FaBars />}
            </button>

            <div className={`navbar-links ${menuOpen ? "open" : ""}`}>
                <div className="nav-links-items">
                <NavLink to="/menu">MENU</NavLink>
                <NavLink to="/about">ABOUT US</NavLink>
                <NavLink to="/orders">ORDERS</NavLink>
                </div>
                <div className="footer-content">
                    <p>nacho@email.com</p>
                    <p>+46 77 77 77</p>
                    <Login type={"admin"} />
                </div>
            </div>
            <NavLink to="/cart" className="navbar-cart">
                <CartIcon variant="desktop"/>
            </NavLink>

            <div className="mobile-bottom-nav">
                <a href="/menu" className="mobile-nav-item">Menu</a>
                <a href="/orders" className="mobile-nav-item">Orders</a>
                <a href="/cart" className="mobile-nav-item">
                    <CartIcon variant="mobile"/>
                </a>
            </div>
        </nav>
    )
}
