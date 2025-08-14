import axios from "axios";
import dotenv fron "dotenv";
dotenv.config();
export const api = axios.create({
  baseURL: `${import.meta.env.process.env.VITE_BACKEND_URL}/api` ,
  withCredentials: true,
});

