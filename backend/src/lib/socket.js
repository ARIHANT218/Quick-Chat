// const { Server } = require("socket.io");

// function initializeSocket(server) {
//   io = new Server(server, { // Initialize with the passed server
//     cors: {
//       origin: ["http://localhost:5173"],
//       pingTimeout: 20000,
//       pingInterval: 10000,
//       methods: ["GET", "POST"],
//       credentials: true,
//     },
//   });

//   const userSocketMap = {}; // Maps userId to socketId
//   const socketUserMap = {}; // Maps socketId to userId

//   function getReceiverSocketId(userId) {
//     return userSocketMap[userId];
//   }

//   function broadcastOnlineUsers() {
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//     console.log("Broadcasting online users:", Object.keys(userSocketMap));
//   }

//   io.on("connection", (socket) => {
//     console.log("A user connected", socket.id);

//     const userId = socket.handshake.query.userId; // Get userId from query

//     if (userId) {
//       // Clean up any old socket for this user
//       const oldSocketId = userSocketMap[userId];
//       if (oldSocketId && oldSocketId !== socket.id) {
//         console.log(`User ${userId} reconnected. Replacing old socket ${oldSocketId}`);
//         const oldSocket = io.sockets.sockets.get(oldSocketId);
//         if (oldSocket) {
//           delete socketUserMap[oldSocketId];
//           oldSocket.disconnect(true);
//         }
//       }

//       // Update the maps
//       userSocketMap[userId] = socket.id;
//       socketUserMap[socket.id] = userId;

//       // Broadcast updated online users
//       broadcastOnlineUsers();
//     }

//     socket.on("disconnect", () => {
//       console.log("A user disconnected", socket.id);

//       const userId = socketUserMap[socket.id];
//       if (userId) {
//         setTimeout(() => {
//           // Only remove if this socket is still the one mapped to the user
//           if (userSocketMap[userId] === socket.id) {
//             delete userSocketMap[userId];
//             delete socketUserMap[socket.id];
//             broadcastOnlineUsers();
//           }
//         }, 1000); // Short delay
//       }
//     });
//     //handle setUserId
//     socket.on("setUserId", (data) => {
//       const { userId } = data;
//       console.log(`Socket ${socket.id} associated with userId: ${userId}`);
//       userSocketMap[userId] = socket.id;
//       socketUserMap[socket.id] = socket.id;
//       broadcastOnlineUsers();
//     });
//   });

//   return { io, getReceiverSocketId }; // Return io and getReceiverSocketId
// }

// module.exports = { initializeSocket }; // Export initializeSocket

const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

// Store socket connections: { userId: socketId }
const userSocketMap = {};

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
  },
});

// Helper to get receiver's socket ID
function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Socket connection handling
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log("Mapped userId to socket:", userId, socket.id);
  }

  // Notify all clients about current online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);

    // Remove user only if the socket matches
    if (userId && userSocketMap[userId] === socket.id) {
      delete userSocketMap[userId];
    }

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

module.exports = { io, app, server, getReceiverSocketId };
