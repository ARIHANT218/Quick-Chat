const express = require('express');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: '', // Default profile picture URL
    },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);