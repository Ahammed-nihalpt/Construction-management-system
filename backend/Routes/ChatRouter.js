/* eslint-disable prettier/prettier */
const express = require('express');
const controller = require('../Controllers/ChatController');
// const tokenMiddleware = require('../Middleware/token');
const router = express.Router();

router.post('/create/chat', controller.createChat);

module.exports = router;
