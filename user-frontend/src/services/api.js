import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8082/api', // Matches your Eclipse port
    headers: {
        'Content-Type': 'application/json',
    },
});

export default API;