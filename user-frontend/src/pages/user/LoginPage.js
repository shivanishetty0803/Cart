import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import userService from '../../services/userservice/userService';
import './css/login.css';

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [popup, setPopup] = useState({ show: false, message: '', isError: false });
 
    /**
 * Authenticates user credentials and manages login success/failure pop-ups.
 * Stores the user's email in localStorage for session persistence.
 * @param {Object} data - Contains email and password from the form
 */
 
    const onSubmit = async (data) => {
        try {
            const successMsg = await userService.loginUser(data);

            localStorage.setItem("userEmail", data.email);

            setPopup({ show: true, message: successMsg, isError: false });

            setTimeout(() => {
                setPopup(prev => ({ ...prev, show: false }));
                navigate('/home');
            }, 2000);
 
        } catch (err) {
            const errorMsg = err.response?.data || "Login failed. Please try again.";
            setPopup({ show: true, message: errorMsg, isError: true });

            setTimeout(() => {
                setPopup(prev => ({ ...prev, show: false }));
            }, 3000);
        }
    };
 
    return (
        <div className="signup-page">

            {/* FLOATING POPUP */}
            {popup.show && (
                <div className={`global-popup ${popup.isError ? 'pop-red' : 'pop-green'}`}>
                    <span className="icon-circle">
                        {popup.isError ? '!' : '✓'}
                    </span>
                    {popup.message}
                </div>
            )}
 
            <div className="signup-card">
                <h2>Welcome Back</h2>
                <p className="subtitle">Login to your ShopHub account.</p>
 
                <form onSubmit={handleSubmit(onSubmit)} noValidate>

                    <div className="form-item">
                        <label>Email Address</label>
                        <input
                            type="email"
                            placeholder="example@mail.com"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
                                    message: "Invalid email (must end in .com)"
                                }
                            })}
                        />
                        {errors.email && (
                            <span className="error-text">{errors.email.message}</span>
                        )}
                    </div>
 
                    <div className="form-item">
                        <label>Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: "Password is required"
                            })}
                        />
                        {errors.password && (
                            <span className="error-text">{errors.password.message}</span>
                        )}
                    </div>

                    {/* Forgot password */}
                    <div
                        className="form-options"
                        style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}
                    >
                        <Link
                            to="/forgot-password"
                            style={{
                                fontSize: '14px',
                                color: '#007bff',
                                textDecoration: 'none'
                            }}
                        >
                            Forgot Password?
                        </Link>
                    </div>

                    <button type="submit" className="submit-btn">
                        Login
                    </button>

                    <p className="switch-auth">
                        Don't have an account?{' '}
                        <Link to="/signup">Sign Up here</Link>
                    </p>

                </form>
            </div>
        </div>
    );
};

export default LoginPage;
