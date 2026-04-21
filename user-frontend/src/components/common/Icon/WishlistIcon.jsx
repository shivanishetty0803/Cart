import React from 'react';

/**
 * Heart-shaped wishlist icon with optional filled state.
 * Supports size, color, and custom styling.
 */
const WishlistIcon = ({ filled = false, size = 20, color = 'currentColor', className = '' }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill={filled ? '#ff4757' : 'none'} 
    stroke={filled ? '#ff4757' : color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    className={className}
    style={{ transition: 'all 0.2s ease' }}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

export default WishlistIcon;
