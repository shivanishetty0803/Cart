import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import userService from '../../services/userservice/userService';
import './css/signup.css';
import { useNavigate, Link } from 'react-router-dom'; 

const SignupPage = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate();
    
    // We removed 'status' because we are using 'popup' now.
    const [popup, setPopup] = useState({ show: false, message: '', isError: false });

    const onSubmit = async (data) => {
        try {
            await userService.registerUser(data); 

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
                        <input 
                            type="tel"
                            placeholder="10-digit mobile number"
                            {...register("phone", { 
                                required: "Phone is required",
                                pattern: { value: /^[0-9]{10}$/, message: "Must be 10 digits" }
                            })}
                        />
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