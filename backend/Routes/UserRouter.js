/* eslint-disable prettier/prettier */
const express = require('express');
const controller = require('../Controllers/UserController');
// const tokenMiddleware = require('../Middleware/token');
const router = express.Router();

router.post('/login', controller.userLogin);
router.get('/data/:id', controller.getUserData);
router.get('/permissions/:id', controller.getSingleDesignation);
router.get('/projects/:id', controller.getUserProjects);
router.get('/get/single/project/:id', controller.getSingleProject);
router.post('/add/progress', controller.addProgress);
router.get('/get/all/progress/:id', controller.getAllProgress);
router.get('/get/labour/:id/:date', controller.getProgressLabourList);
router.post('/payment/request', controller.requestPayment);
router.get('/payment/history/:uid', controller.getPaymentHistory);
router.post('/cancel/payment', controller.cancelPayment);

module.exports = router;
