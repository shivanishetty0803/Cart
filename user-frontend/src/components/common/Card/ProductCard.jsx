import React, { useState } from 'react';
import Button from '../Button/Button';
import WishlistIcon from '../Icon/WishlistIcon';
import './ProductCard.css';

/**
 * Displays product details with wishlist toggle and add-to-cart action.
 * Used to render individual product cards in listings.
 */
const ProductCard = ({ title, price, imageUrl, onAddToCart }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="product-card">
      <div className="product-image-container">
        <button
          className="product-wishlist-btn"
          onClick={toggleWishlist}
          aria-label="Add to Wishlist"
        >
          <WishlistIcon filled={isWishlisted} size={20} color="#666" />
        </button>

        {imageUrl ? (
          <img src={imageUrl} alt={title} className="product-image" />
        ) : (
          <div className="product-image-placeholder">No Image</div>
        )}
      </div>

      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <div className="product-price">${price}</div>
        <div className="product-actions" style={{ display: 'flex', gap: '8px' }}>
          <Button variant="black" style={{ flex: 1 }} onClick={onAddToCart}>
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
