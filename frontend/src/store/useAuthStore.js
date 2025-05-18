import { create } from 'zustand'
import { api } from '../lib/axios'
import toast from 'react-hot-toast'
import { io } from 'socket.io-client';
const BASE_URL = import.meta.env.MODE === "development"? 'http://localhost:5000/api': "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSignedIn: false,
  isLoading: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,
  
  checkAuth: async () => {
    try {
      const response = await api.get('/auth/check', { withCredentials: true });
      set({ authUser: response.data });
      get().connectSocket();
    }
    catch {
      set({ authUser: null });
    }
    finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await api.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
      get().connectSocket(); // Fixed typo here
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoading: true });
    try {
      const res = await api.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("loggedIn Successfully");
      get().connectSocket();
    }
    catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
      get().disconnectSocket(); // Fixed typo here
      set({ authUser: null });
      toast.success("Logout Successfully");
    }
    catch (error) {
      toast.error(error.response.data.message);
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await api.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Update Successfully");
    }
    catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser) return;

    // Disconnect existing socket if any
    get().disconnectSocket();

    const socket = io(BASE_URL , {  
      transports: ['websocket', 'polling'], // Try both WebSocket and polling
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
      query: {
        userId: authUser._id,
      },
    });

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      console.log("Online users received from server:", userIds);
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, onlineUsers: [] });
    }
  },
}));