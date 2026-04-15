
import React, { useState, useEffect } from "react";
import "./css/CartPage.css";
import cartService from "../../services/cart/cartService";


function CartPage() {
  const [items, setItems] = useState([]);

  const loadItems = async () => {
    const data = await cartService.getCartItems();
    setItems(data);
  };

  useEffect(() => {
    loadItems();
  }, []);

  const updateLocalQty = (id, newQty) => {
    setItems(prev =>
      prev.map(item =>
        item.cartItemId === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const increaseQty = async (item) => {
    const newQty = item.quantity + 1;
    updateLocalQty(item.cartItemId, newQty);
    await cartService.updateItemQuantity(item.cartItemId, newQty);
  };

  const decreaseQty = async (item) => {
    if (item.quantity <= 1) return;
    const newQty = item.quantity - 1;
    updateLocalQty(item.cartItemId, newQty);
    await cartService.updateItemQuantity(item.cartItemId, newQty);
  };

  const deleteItem = async (itemId) => {
    await cartService.deleteItem(itemId);
    loadItems();
  };

  const clearCart = async () => {
    await cartService.clearCart();
    loadItems();
  };

  const subtotal = items.reduce(
    (sum, i) => sum + i.unitPrice * i.quantity,
    0
  );
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="cart-container">
      <div className="cart-header">
        <h2>Shopping Cart</h2>
        <button className="clear-cart-btn" onClick={clearCart}>
          Clear Cart
        </button>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map(item => (
            <div className="cart-item-card" key={item.cartItemId}>
              <img
                className="product-img"
                src="https://via.placeholder.com/80"
                alt="Product"
              />

              <div className="product-details">
                <p className="product-title">{item.productName}</p>
                <p className="product-price">
                  ${item.unitPrice.toFixed(2)}
                </p>

                <div className="qty-section">
                  <button onClick={() => decreaseQty(item)}>−</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item)}>+</button>
                </div>
              </div>

              <div className="price-right">
                <p>${(item.unitPrice * item.quantity).toFixed(2)}</p>
                <button onClick={() => deleteItem(item.cartItemId)}>🗑</button>
              </div>
            </div>
          ))}
        </div>

        <div className="summary-card">
          <h3>Order Summary</h3>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn">Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;