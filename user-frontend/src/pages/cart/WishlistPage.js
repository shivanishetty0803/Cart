import React, { useEffect, useState } from "react";
import axios from "axios";
import "./css/WishlistPage.css";
import Navbar from "../../components/layout/Navbar/Navbar";
import WishlistIcon from "../../components/common/Icon/WishlistIcon";
import Button from "../../components/common/Button/Button";

/**
 * Temporary user ID for testing wishlist functionality
 */
const userId = 1;

/**
 * WishlistPage Component
 * ----------------------
 * Displays all products added to the user's wishlist.
 * Allows removing products and moving them to the cart.
 */
function WishlistPage() {

  /**
   * State: Stores wishlist items fetched from backend
   */
  const [items, setItems] = useState([]);

  /**
   * Fetch wishlist items for the user
   * Calls backend API and updates local state
   */
  const loadWishlist = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/wishlist/${userId}`
      );
      setItems(res.data);
    } catch (error) {
      console.error("Error loading wishlist:", error);
    }
  };

  /**
   * Remove item from wishlist
   * Refreshes wishlist after successful deletion
   */
  const removeWishlist = async (wishlistId) => {
    await axios.delete(
      `http://localhost:8080/api/wishlist/${wishlistId}`
    );
    loadWishlist();
  };

  /**
   * Move wishlist item to cart
   * Calls backend API and reloads wishlist
   */
  const moveToCart = async (wishlistId) => {
    await axios.post(
      `http://localhost:8080/api/wishlist/move-to-cart/${wishlistId}/${userId}`
    );
    loadWishlist();
  };

  /**
   * Load wishlist items when component mounts
   */
  useEffect(() => {
    loadWishlist();
  }, []);

  return (
    <>
      {/* Navigation bar */}
      <Navbar />

      <div className="wishlist-wrapper">

        {/* Wishlist page header */}
        <div className="wishlist-header-row">
          <h1>My Wishlist</h1>
        </div>

        {/* Wishlist item count */}
        <p className="wishlist-count">
          {items.length} {items.length === 1 ? "product" : "products"} in your wishlist
        </p>

        {/* Wishlist items list */}
        <div className="wishlist-list">
          {items.length === 0 ? (

            /* Empty wishlist state */
            <div className="wishlist-empty">
              <p>Your wishlist is empty</p>
            </div>

          ) : (
            items.map((item) => (
              <div className="wishlist-card" key={item.wishlistId}>

                {/* Wishlist product image container */}
                <div className="wishlist-img-container">

                  {/* Remove from wishlist button */}
                  <button
                    className="wishlist-heart-btn"
                    onClick={() => removeWishlist(item.wishlistId)}
                  >
                    <WishlistIcon filled size={20} />
                  </button>

                  {/* Product image */}
                  <img
                    src="https://via.placeholder.com/300"
                    alt="product"
                    className="wishlist-img"
                  />
                </div>

                {/* Wishlist product details */}
                <div className="wishlist-details">
                  <p className="wishlist-name">
                    Product ID: {item.productId}
                  </p>

                  <p className="wishlist-desc">
                    Product description here...
                  </p>

                  {/* Wishlist action buttons */}
                  <div className="wishlist-actions">
                    <Button
                      variant="black"
                      onClick={() => moveToCart(item.wishlistId)}
                      style={{ flex: 1 }}
                    >
                      Move to Cart
                    </Button>

                    <Button
                      variant="primary"
                      onClick={() =>
                        console.log("Buy Now:", item.productId)
                      }
                      style={{ flex: 1 }}
                    >
                      Buy Now
                    </Button>
                  </div>
                </div>

              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default WishlistPage;