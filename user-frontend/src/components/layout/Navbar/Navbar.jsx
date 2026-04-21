import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../common/Button/Button";
// import Input from "../../common/Input/Input";
import "./Navbar.css";

/**
 * Navbar component
 *
 * Renders the top navigation bar for the application, including:
 * - Brand logo with navigation to home
 * - Optional search bar (currently commented out)
 * - Action buttons for Profile, Wishlist, and Cart
 *
 * Uses React Router's `useNavigate` hook for programmatic navigation.
 *
 * @component
 * @returns {JSX.Element} The rendered navigation bar
 */
const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="navbar-container">
      <nav className="navbar">

        {/* Brand Logo */}
        <div
          className="navbar-brand"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer" }}
        >
          <svg
            className="navbar-brand-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className="navbar-brand-text">ShopHub</span>
        </div>

        {/* Search Bar (optional – currently disabled) */}
        {/*
        <div className="navbar-search">
          <Input
            placeholder="Search for Products, Brands and More"
            aria-label="Search"
          />
        </div>
        */}

        {/* Action Buttons */}
        <div className="navbar-actions">
          <Button variant="ghost" onClick={() => navigate("/profile")}>
            Profile
          </Button>

          <Button variant="ghost" onClick={() => navigate("/wishlist")}>
            Wishlist
          </Button>

          <Button
            variant="ghost"
            icon={<CartIcon />}
            onClick={() => navigate("/cart")}
          >
            Cart
          </Button>
        </div>

      </nav>
    </header>
  );
};

/**
 * CartIcon component
 *
 * Displays a shopping cart SVG icon.
 * Used inside the Cart button in the navbar.
 *
 * @component
 * @returns {JSX.Element} SVG cart icon
 */
const CartIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="9" cy="21" r="1.5" />
    <circle cx="20" cy="21" r="1.5" />
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
  </svg>
);

export default Navbar;
