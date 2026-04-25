import API from '../api';
import axios from 'axios';
 
const userService = {
 
    /**
 * Calls the signup endpoint to create a new customer record.
 * @param {Object} userData - Complete user profile data
 * @returns {Promise} Backend response data
 */
    registerUser: async (userData) => {
        const response = await API.post('/customers/signup', userData);
        return response.data;
    },
 
    /**
 * Sends login credentials to the backend for verification.
 * @param {Object} loginData - Email and password
 * @returns {Promise} Authentication success message
 */
    loginUser: async (loginData) => {
        // Matches your @PostMapping("/login") in UserController
        const response = await API.post('/customers/login', loginData);
        return response.data;
    },
 
    /**
 * Initiates the forgot password workflow by sending the email to the API.
 * @param {string} email - The user's registered email address
 */
    forgotPassword: async (email) => {
        const response = await axios.post('http://localhost:8082/api/customers/forgot-password', { email });
        return response.data;
    },
 
    /**
 * Submits the OTP and the new password to complete the reset process.
 * @param {Object} resetData - Object containing email, otp, and newPassword
 */
    resetPassword: async (resetData) => {
        // resetData contains { email, otp, newPassword }
        const response = await axios.post('http://localhost:8082/api/customers/reset-password', resetData);
        return response.data;
    }
 
};
 
export default userService;