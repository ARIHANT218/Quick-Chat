import axios from "axios";

export const api = axios.create({
  baseURL:"https://quick-chat-1-wblr.onrender.com/api",
  withCredentials: true,
});


