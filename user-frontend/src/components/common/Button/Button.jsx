import React from 'react';
import './Button.css';

/**
 * Reusable button component supporting variants, icons, and custom styling.
 * Used across the application for consistent button UI.
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  icon, 
  className = '', 
  ...props 
}) => {
  return (
    <button 
      className={`base-button button-${variant} ${className}`}
      {...props}
    >
      {icon && <span className="button-icon">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
