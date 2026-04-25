import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import userService from '../../services/userservice/userService';
import './css/signup.css';
import { useNavigate, Link } from 'react-router-dom';
 
const SignupPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
 
    const navigate = useNavigate();
   
   
    const [popup, setPopup] = useState({ show: false, message: '', isError: false });
 
    const countryCodes = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'USA' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'Australia' }
    ];
 
    const [selectedCode, setSelectedCode] = useState('+91');
 
 
    /**
 * Processes new user registration with a combined country code and phone number.
 * Displays a success or error pop-up and navigates to login on success.
 * @param {Object} data - Registration form data (fullName, email, phone, password)
 */
    const onSubmit = async (data) => {
        try {
 
            const payload = {
            ...data,
            phone: `${selectedCode}${data.phone}` // Combines +91 and 9876543210
        };
            await userService.registerUser(payload);
 
            // Trigger the Floating Pop-up (Success)
            setPopup({ show: true, message: 'Customer registered successfully!', isError: false });
           
            // Auto-hide after 3 seconds
            setTimeout(() => {
                setPopup(prev => ({ ...prev, show: false }));
                navigate('/login');
            }, 3000);
           
            reset();
        } catch (err) {
            // Trigger the Floating Pop-up (Error)
            setPopup({
                show: true,
                message: err.response?.data?.message || 'Signup failed. Customer already registered',
                isError: true
            });
           
            setTimeout(() => {
                setPopup(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };
 
    return (
        <div className="signup-page">
            {/* FLOATING POPUP - Independent of the card */}
            {popup.show && (
                <div className={`global-popup ${popup.isError ? 'pop-red' : 'pop-green'}`}>
                    <span className="icon-circle">{popup.isError ? '!' : '✓'}</span>
                    {popup.message}
                </div>
            )}
 
            <div className="signup-card">
                <h2>Create Your Account</h2>
                <p className="subtitle">Start your journey with ShopHub.</p>
 
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="form-item">
                        <label>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            {...register("fullName", { required: "Full name is required" })}
                        />
                        {errors.fullName && <span className="error-text">{errors.fullName.message}</span>}
                    </div>
 
                    <div className="form-item">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.com$/,
                                    message: "Invalid email address"
                                }
                            })}
                        />
                        {errors.email && <span className="error-text">{errors.email.message}</span>}
                    </div>
 
                    <div className="form-item">
    <label>Phone Number</label>
    <div className="phone-input-container" style={{ display: 'flex', gap: '8px' }}>
        <select
            value={selectedCode}
            onChange={(e) => setSelectedCode(e.target.value)}
            className="country-select"
            style={{ width: '100px', borderRadius: '10px', border: '2px solid #e2e8f0', padding: '0.5rem' }}
        >
            {countryCodes.map(c => (
                <option key={c.code} value={c.code}>{c.country} ({c.code})</option>
            ))}
        </select>
        <input
        type="tel"
        placeholder="10-digit mobile number"
        style={{ flex: 1 }}
        {...register("phone", {
            required: "Phone is required",
            // 1. Check if it's numeric
            validate: {
                isNumeric: (value) => /^\d+$/.test(value) || "Please enter a valid numeric value",
                // 2. Check the exact length
                isTenDigits: (value) => value.length === 10 || "Must be 10 digits"
            }
        })}
    />
    </div>
    {errors.phone && <span className="error-text">{errors.phone.message}</span>}
</div>
 
                    <div className="form-item">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Minimum 6 characters"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password too short" }
                            })}
                        />
                        {errors.password && <span className="error-text">{errors.password.message}</span>}
                    </div>
 
 
                    {/*Terms and Conditions Checkbox */}
                    <div className="form-item checkbox-item">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("terms", { required: "You must agree to the terms" })}
                                style={{ width: 'auto', cursor: 'pointer' }}
                            />
                            <label htmlFor="terms" style={{ fontSize: '0.9rem', cursor: 'pointer' }}>
                                I agree to the <a href="/terms.txt" target="_blank" rel="noopener noreferrer" style={{ color: '#4f46e5', textDecoration: 'underline' }}>terms and conditions</a>
                            </label>
                        </div>
                        {errors.terms && <span className="error-text">{errors.terms.message}</span>}
                    </div>
 
                    <button type="submit" className="submit-btn">Sign Up</button>
 
                    <p className="switch-auth">
                        Already have an account? <Link to="/login">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};
 
export default SignupPage;