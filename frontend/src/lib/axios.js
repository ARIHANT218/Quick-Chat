import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "https://quick-chat-1-wblr.onrender.com/api" : "/api",
  withCredentials: true,
});


