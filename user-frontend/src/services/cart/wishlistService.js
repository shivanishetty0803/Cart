import axios from "axios";

const BASE_URL = "http://localhost:8080/api/wishlist";

/* Add product to wishlist */
const addToWishlist = (userId, productId) =>
  axios.post(`${BASE_URL}/${userId}`, { productId });

/* Move cart item to wishlist */
const moveToWishlist = (cartItem) =>
  axios.post(`${BASE_URL}/${cartItem.userId}`, {
    productId: cartItem.productId,
  });

/* Get wishlist items for a user */
const getWishlist = (userId) =>
  axios.get(`${BASE_URL}/${userId}`);

/* Delete wishlist item */
const deleteWishlistItem = (wishlistId) =>
  axios.delete(`${BASE_URL}/${wishlistId}`);

/* Named object export */
const wishlistService = {
  addToWishlist,
  moveToWishlist,
  getWishlist,
  deleteWishlistItem,
};

export default wishlistService;
