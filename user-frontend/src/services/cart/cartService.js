import axios from "axios";

const BASE_URL = "http://localhost:8080/api/cart";
const userId = 1; // later you can get this from login/session

const cartService = {
  getCartItems: async () => {
    const response = await axios.get(`${BASE_URL}/items/${userId}`);
    return response.data;
  },

  updateItemQuantity: async (cartItemId, quantity) => {
    await axios.put(`${BASE_URL}/items/${cartItemId}`, { quantity });
  },

  deleteItem: async (cartItemId) => {
    await axios.delete(`${BASE_URL}/items/${cartItemId}`);
  },

  clearCart: async () => {
    await axios.delete(`${BASE_URL}/items/clear/${userId}`);
  },
};

export default cartService;