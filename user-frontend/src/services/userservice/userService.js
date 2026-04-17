import API from '../api';
import axios from 'axios';
 
const userService = {
    registerUser: async (userData) => {
        const response = await API.post('/customers/signup', userData);
        return response.data;
    },
    loginUser: async (loginData) => {
        // Matches your @PostMapping("/login") in UserController
        const response = await API.post('/customers/login', loginData);
        return response.data;
    },
    forgotPassword: async (email) => {
        const response = await axios.post('http://localhost:8082/api/customers/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (resetData) => {
        // resetData contains { email, otp, newPassword }
        const response = await axios.post('http://localhost:8082/api/customers/reset-password', resetData);
        return response.data;
    }

};
 
export default userService; // This allows 'import userService' to work