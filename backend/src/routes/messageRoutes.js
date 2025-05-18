 const express = require('express');
const messageRoutes = express.Router();
const messageController = require('../controllers/messageController');
const protectRoutes = require('../middleWare/auth.middleware');

messageRoutes.get("/users", protectRoutes, messageController.getUsersForSidebar);
messageRoutes.get("/:id", protectRoutes, messageController.getMessages);
messageRoutes.post("/send/:id", protectRoutes, messageController.sendMessage);

module.exports = messageRoutes;