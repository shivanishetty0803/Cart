import axios from "axios";

/**
 * Cart API base URL
 */
const BASE_URL = "http://localhost:8080/api/cart";

/**
 * Temporary user ID (replace with logged-in user later)
 */
const userId = 1;

/**
 * Provides cart-related API operations
 */
const cartService = {

  /**
   * Fetch all cart items for the user
   */
  getCartItems: async () => {
    const response = await axios.get(`${BASE_URL}/items/${userId}`);
    return response.data;
  },

  /**
   * Update quantity of a cart item
   */
  updateItemQuantity: async (cartItemId, quantity) => {
    await axios.put(`${BASE_URL}/items/${cartItemId}`, { quantity });
  },

  /**
   * Remove an item from the cart
   */
  deleteItem: async (cartItemId) => {
    await axios.delete(`${BASE_URL}/items/${cartItemId}`);
  },

  /**
   * Clear all items from the cart
   */
  clearCart: async () => {
    await axios.delete(`${BASE_URL}/items/clear/${userId}`);
  },
};

export default cartService;
