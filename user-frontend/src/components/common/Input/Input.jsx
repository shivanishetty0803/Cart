import React from 'react';
import './Input.css';

/**
 * Reusable input component with optional label and icon support.
 * Used for controlled form inputs across the application.
 */
const Input = ({ 
  label, 
  icon, 
  placeholder, 
  value, 
  onChange, 
  type = 'text',
  className = '',
  ...props
}) => {
  return (
    <div className={`input-wrapper ${className}`}>
      {label && <label className="input-label">{label}</label>}
      <div className="input-container">
        {icon && <div className="input-icon">{icon}</div>}
        <input 
          type={type}
          className="input-field"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          {...props}
        />
      </div>
    </div>
  );
};

export default Input;
