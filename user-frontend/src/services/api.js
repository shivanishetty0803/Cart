import axios from 'axios';
 
 
/**
 * Global API configuration instance.
 * Sets the base URL to point to the Spring Boot server running on port 8082.
 * Includes default 'Content-Type' headers for JSON payloads.
 */
const API = axios.create({
    baseURL: 'http://localhost:8082/api', // Matches your Eclipse port
    headers: {
        'Content-Type': 'application/json',
    },
});
 
export default API;