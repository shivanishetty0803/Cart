import React, { useState, useEffect } from "react";
import "./css/CartPage.css";
import Navbar from "../../components/layout/Navbar/Navbar";
import cartService from "../../services/cart/cartService";
import wishlistService from "../../services/cart/wishlistService";

/**
 * CartPage Component
 * ------------------
 * Displays cart items, allows quantity updates,
 * handles wishlist movement, and shows order summary.
 */
function CartPage() {

  /**
   * State: Cart items list
   */
  const [items, setItems] = useState([]);

  /**
   * State: Controls wishlist confirmation popup visibility
   */
  const [showPopup, setShowPopup] = useState(false);

  /**
   * State: Holds currently selected item for wishlist action
   */
  const [selectedItem, setSelectedItem] = useState(null);

  /**
   * State: Success toast message text
   */
  const [successMsg, setSuccessMsg] = useState("");

  /**
   * Load cart items from backend
   * Adds temporary mock stock quantity for UI handling
   */
  const loadItems = async () => {
    const data = await cartService.getCartItems();

    const updated = data.map((item) => ({
      ...item,
      stockQuantity: item.productId === 2 ? 0 : 10, // TEMP mock stock data
    }));

    setItems(updated);
  };

  /**
   * Fetch cart items when component loads
   */
  useEffect(() => {
    loadItems();
  }, []);

  /**
   * Optimistically update quantity in UI
   * Used before API response for smooth UX
   */
  const updateLocalQty = (id, newQty) => {
    setItems((prev) =>
      prev.map((item) =>
        item.cartItemId === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  /**
   * Increase item quantity
   * Performs optimistic update with rollback on failure
   */
  const increaseQty = async (item) => {
    if (item.stockQuantity === 0) return;

    const newQty = item.quantity + 1;
    updateLocalQty(item.cartItemId, newQty);

    try {
      await cartService.updateItemQuantity(item.cartItemId, newQty);
    } catch (err) {
      updateLocalQty(item.cartItemId, item.quantity); // rollback
    }
  };

  /**
   * Decrease item quantity
   * Prevents quantity below 1
   */
  const decreaseQty = async (item) => {
    if (item.stockQuantity === 0 || item.quantity <= 1) return;

    const newQty = item.quantity - 1;
    updateLocalQty(item.cartItemId, newQty);

    try {
      await cartService.updateItemQuantity(item.cartItemId, newQty);
    } catch {
      updateLocalQty(item.cartItemId, item.quantity); // rollback
    }
  };

  /**
   * Delete item from cart
   * Reloads items after deletion
   */
  const deleteItem = async (id) => {
    await cartService.deleteItem(id);
    loadItems();
  };

  /**
   * Opens wishlist confirmation popup
   */
  const openWishlistPopup = (item) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  /**
   * Moves selected item to wishlist
   * Removes item from cart after wishlist success
   */
  const moveToWishlist = async () => {
    if (!selectedItem) return;

    await wishlistService.addToWishlist(1, selectedItem.productId);
    await cartService.deleteItem(selectedItem.cartItemId);

    setShowPopup(false);
    setSuccessMsg("1 item moved successfully to wishlist");

    setTimeout(() => setSuccessMsg(""), 1500);
    loadItems();
  };

  /**
   * Order price calculations
   */
  const subtotal = items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax + 10;

  return (
    <>
      <Navbar />

      <div className="cart-wrapper">

        {/* Success toast message */}
        {successMsg && (
          <div className="success-toast">{successMsg}</div>
        )}

        {/* Wishlist confirmation popup */}
        {showPopup && (
          <div className="wishlist-popup-overlay">
            <div className="wishlist-popup-card">
              <h3>Move 1 item to wishlist</h3>
              <p>Are you sure you want to move this item?</p>

              <div className="wishlist-popup-buttons">
                <button
                  className="popup-cancel-btn"
                  onClick={() => setShowPopup(false)}
                >
                  Cancel
                </button>

                <button
                  className="popup-move-btn"
                  onClick={moveToWishlist}
                >
                  Move To Wishlist
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Cart header */}
        <div className="cart-header-row">
          <h2>Shopping Cart</h2>
          <button className="continue-btn-top">
            Continue Shopping
          </button>
        </div>

        {/* Empty cart state */}
        {items.length === 0 ? (
          <div className="cart-empty-state">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-layout">

              {/* Cart items section */}
              <div className="cart-left">
                {items.map((item) => (
                  <div
                    className="cart-item"
                    key={item.cartItemId}
                  >
                    <img
                      src="https://via.placeholder.com/80"
                      className="product-img"
                      alt="product"
                    />

                    <div className="item-middle">
                      <p className="item-title">
                        {item.productName}
                      </p>
                      <p className="item-category">
                        Category
                      </p>

                      {item.stockQuantity === 0 && (
                        <p className="out-of-stock">
                          Out Of Stock
                        </p>
                      )}

                      {/* Quantity selector */}
                      <div className="qty-box">
                        <button
                          disabled={item.stockQuantity === 0}
                          onClick={() => decreaseQty(item)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          disabled={item.stockQuantity === 0}
                          onClick={() => increaseQty(item)}
                        >
                          +
                        </button>
                      </div>

                      {/* Wishlist button */}
                      <button
                        className="wishlist-btn"
                        onClick={() =>
                          openWishlistPopup(item)
                        }
                      >
                        Add to Wishlist
                      </button>
                    </div>

                    {/* Price and delete */}
                    <div className="item-right">
                      <p className="item-price">
                        ${item.unitPrice.toFixed(2)}
                      </p>
                      <button
                        className="delete-icon"
                        onClick={() =>
                          deleteItem(item.cartItemId)
                        }
                      >
                        🗑
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order summary section */}
              <div className="order-summary">
                <h3>Order Summary</h3>

                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span>$10.00</span>
                </div>

                <div className="summary-total">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <button
                  className="checkout-btn"
                  disabled={items.some(
                    (i) => i.stockQuantity === 0
                  )}
                >
                  Proceed to Checkout
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </>
  );
}

export default CartPage;