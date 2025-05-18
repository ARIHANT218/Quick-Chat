const express = require('express');

const authRoutes = express.Router();
const authController = require('../controllers/authController.js');
const protectRoutes = require('../middleWare/auth.middleware.js');



authRoutes.post('/signup', authController.signup);
authRoutes.post('/login', authController.login);
authRoutes.post('/logout', authController.logout);
authRoutes.put('/update-profile',protectRoutes,authController.updateUserProfile);

authRoutes.get('/check', protectRoutes, authController.checkUser);

module.exports = authRoutes;