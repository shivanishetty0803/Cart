import API from './api';
 
const userService = {
    registerUser: async (userData) => {
        const response = await API.post('/customers/signup', userData);
        return response.data;
    }
};
 
export default userService; // This allows 'import userService' to work