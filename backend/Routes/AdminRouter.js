/* eslint-disable prettier/prettier */
const express = require('express');
const controller = require('../Controllers/AdminController');
const validateAdminToken = require('../Middleware/adminToken');
// const tokenMiddleware = require('../Middleware/token');
const router = express.Router();

router.post('/login', controller.adminLogin);
router.get('/all/companies', validateAdminToken, controller.getAllCompanies);
router.get(
  '/change/company/status/:id',
  validateAdminToken,
  controller.blockUnblockCompany
);

module.exports = router;
