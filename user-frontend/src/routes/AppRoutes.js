import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SignupPage from '../pages/user/SignupPage';
import LoginPage from '../pages/user/LoginPage';
import ForgotPassword from '../pages/user/ForgotPassword';
import ProfilePage from '../pages/user/ProfilePage';

const AppRoutes = () => {
    return (
        <Routes>
            {/* When the user visits http://localhost:3000/, send them to Login */}
            <Route path="/" element={<Navigate to="/login" />} />
            
            {/* The paths for your two pages */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            <Route path="/forgot-password" element={<ForgotPassword />} />

            <Route path="/profile" element={<ProfilePage />} />
            
            {/* A placeholder for after they login */}
            <Route path="/home" element={<div>Welcome to the Dashboard!</div>} />
        </Routes>
    );
};

export default AppRoutes;