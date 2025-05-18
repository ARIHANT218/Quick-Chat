// api.js
import axios from 'axios';
export const api = axios.create({
  baseURL: import.meta.env.MODE === "development"
    ? 'http://localhost:5000/api'
    : import.meta.env.VITE_API_URL, // Use environment variable in prod

  withCredentials: true,
});


