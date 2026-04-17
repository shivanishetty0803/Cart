import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // 1: Email Request, 2: Reset Password
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // STEP 1: Request the OTP
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8082/api/customers/forgot-password', { email });
            setMessage("OTP sent to your email!");
            setStep(2);
        } catch (err) {
            setMessage(err.response?.data || "Error sending OTP. Please check the email.");
        } finally {
            setLoading(false);
        }
    };

    // STEP 2: Submit OTP and New Password
    const handleResetPassword = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('http://localhost:8082/api/customers/reset-password', { email, otp, newPassword });
            alert("Password updated successfully!");
            navigate('/login'); // Redirect back to login
        } catch (err) {
            setMessage(err.response?.data || "Invalid OTP or request expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '100px auto', padding: '20px', border: '1px solid #ddd', borderRadius: '8px' }}>
            <h2 style={{ textAlign: 'center' }}>{step === 1 ? "Forgot Password" : "Reset Password"}</h2>
            <p style={{ fontSize: '14px', color: '#666' }}>
                {step === 1 ? "Enter your email to receive a 6-digit verification code." : "Enter the code and your new password."}
            </p>

            {step === 1 ? (
                <form onSubmit={handleSendOtp}>
                    <input type="email" placeholder="Email Address" required value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        {loading ? "Sending..." : "Send OTP"}
                    </button>
                </form>
            ) : (
                <form onSubmit={handleResetPassword}>
                    <input type="text" placeholder="6-Digit OTP" required value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '10px' }} />
                    <input type="password" placeholder="New Password" required value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        style={{ width: '100%', padding: '10px', marginBottom: '15px' }} />
                    <button type="submit" disabled={loading} style={{ width: '100%', padding: '10px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}>
                        {loading ? "Updating..." : "Update Password"}
                    </button>
                </form>
            )}
            {message && <p style={{ marginTop: '15px', color: 'red', textAlign: 'center' }}>{message}</p>}
        </div>
    );
};

export default ForgotPassword;