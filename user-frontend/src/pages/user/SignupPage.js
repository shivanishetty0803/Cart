import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
//import { registerUser } from '../../services/userService';
//import registerUser from '../../services/userService';
import userService from '../../services/userService';
import './css/signup.css';

const SignupPage = () => {
    // register: links inputs to validation logic
    // handleSubmit: handles the click event
    // errors: contains any validation messages
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    
    const [status, setStatus] = useState({ message: '', isError: false });

    const onSubmit = async (data) => {
    try {
        // Change this line right here:
        const successMsg = await userService.registerUser(data); 
        
        setStatus({ message: successMsg, isError: false });
        reset(); 
    } catch (err) {
        setStatus({ message: err.message, isError: true });
    }
};

    return (
        <div className="signup-page">
            <div className="signup-card">
                <h2>Create Your Account</h2>
                <p className="subtitle">Join our ShopHub community today!</p>

                {status.message && (
                    <div className={`alert ${status.isError ? 'alert-danger' : 'alert-success'}`}>
                        {status.message}
                    </div>
                )}

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
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 
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
                </form>
            </div>
        </div>
    );
};

export default SignupPage;