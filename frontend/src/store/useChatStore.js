import { create } from 'zustand'
import {api} from '../lib/axios'
import toast from 'react-hot-toast'
import { useAuthStore } from './useAuthStore';


export const useChatStore = create((set,get)=>({
    messages :[],
    users:[],
    selectedUser :null ,
    isUserLoading:false,
    isMessagesLoading :false,

  getUsers: async () => {
        set({ isUserLoading: true });
        try {
          const res = await api.get("/messages/users");
          set({ users: res.data.userFilter });
      console.log("Users array in useChatStore:", res.data.userFilter);
        } catch (error) {
          toast.error(error.response?.data?.message || "Failed to fetch users");
          set({ isUserLoading: false, users: [] }); 
        } finally {
          set({ isUserLoading: false });
        }
},

    getMessages: async  (userId)=>{
        set({isMessagesLoading:true});
        try{
            const res = await api.get(`/messages/${userId}`);

            console.log("getMessages",res.data);
            set({ messages: res.data });

        }
        catch (error) {
            toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
    },

  sendMessages: async (MessageData) => {
  const { selectedUser, messages } = get();

        try {
          const res = await api.post(
            `/messages/send/${selectedUser._id}`, 
            MessageData,
            { withCredentials: true }
          );

          // Ensure response and data exist before accessing
          if (!res || !res.data) {
            throw new Error("No response data from server");
          }
            console.log("Messages before update:", get().messages);
             set({ messages: [...messages, res.data] });
            console.log("Messages after update:", get().messages);

        } catch (error) {
          console.error("Send message error:", error);
          
          // Safely extract error message
          const errMsg = error?.response?.data?.message || "Failed to send message";
          toast.error(errMsg);
        }
},

     // REAL TIME MESSAGES
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;

        const socket = useAuthStore.getState().socket;

        socket.on("newMessages", (newMessage) => {
          if (String(newMessage.senderId) !== String(selectedUser._id)) return;
          
          set({
        messages: [...get().messages, newMessage],
      });
        });
},

    unsubscribeFromMessages: () => {
  const socket = useAuthStore.getState().socket;
  socket.off("newMessages");
},



    // add socket.io
    setSelectedUser :(selectedUser)=> set({selectedUser})

    


}))