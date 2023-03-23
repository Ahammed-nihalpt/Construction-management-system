/* eslint-disable prettier/prettier */
const express = require('express');
const controller = require('../Controllers/ChatController');
// const tokenMiddleware = require('../Middleware/token');
const router = express.Router();

router.post('/getuser', controller.getUsersAndUreadedChat);
router.get('/desiganationd/:id', controller.getChatDesignation);
router.post('/history', controller.getPreviousMessage);

module.exports = router;
