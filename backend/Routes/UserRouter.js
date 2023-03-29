/* eslint-disable prettier/prettier */
const express = require('express');
const controller = require('../Controllers/UserController');
const tokenMiddleware = require('../Middleware/userToken');

const router = express.Router();

router.post('/login', controller.userLogin);
router.get('/data/:id', tokenMiddleware, controller.getUserData);
router.get(
  '/permissions/:id',
  tokenMiddleware,
  controller.getSingleDesignation
);
router.get('/projects/:id', tokenMiddleware, controller.getUserProjects);
router.get('/get/single/project/:id', controller.getSingleProject);
router.post('/add/progress', tokenMiddleware, controller.addProgress);
router.get('/get/all/progress/:id', tokenMiddleware, controller.getAllProgress);
router.get(
  '/get/labour/:id/:date',
  tokenMiddleware,
  controller.getProgressLabourList
);
router.post('/payment/request', tokenMiddleware, controller.requestPayment);
router.get(
  '/payment/history/:uid',
  tokenMiddleware,
  controller.getPaymentHistory
);
router.post('/cancel/payment', tokenMiddleware, controller.cancelPayment);

module.exports = router;
