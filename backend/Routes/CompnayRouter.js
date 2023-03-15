const express = require('express');
const controller = require('../Controllers/CompanyController');
const tokenMiddleware = require('../Middleware/token');

const router = express.Router();

router.post('/registration', controller.Registration);
router.post('/verifyOTP', controller.verifyOTP);
router.post('/setpassword', controller.setPassword);
router.post('/getCMPId', controller.getCMPId);
router.get('/get/:id', controller.getCompanyDetails);
router.post('/login', controller.login);
router.post('/resendOTP', controller.resendOTP);

router.post('/project/add', tokenMiddleware, controller.addProject);
router.post(
  '/project/image/:id',
  tokenMiddleware,
  controller.uploadProjectImage
);
router.post('/edit/pofile/:id', tokenMiddleware, controller.companyEditImage);
router.get('/all/projects/:id', tokenMiddleware, controller.getProjects);
router.get('/project/:id', tokenMiddleware, controller.getSingleProject);
router.post('/edit/project/:id', tokenMiddleware, controller.editProject);
router.post('/project/schedule/add', tokenMiddleware, controller.addSchedule);
router.get('/project/schedule/:id', tokenMiddleware, controller.getSchedules);
router.post(
  '/project/schedule/delete',
  tokenMiddleware,
  controller.deleteSchedules
);
router.post(
  '/project/access/user',
  tokenMiddleware,
  controller.addProjectAccesToUser
);
router.post(
  '/project/access/remove',
  tokenMiddleware,
  controller.removeUserProjectAccess
);

router.post('/designation/add', tokenMiddleware, controller.addDesignation);
router.get('/designation/:id', tokenMiddleware, controller.getDesignation);

router.post('/user/add', tokenMiddleware, controller.addUser);
router.get('/users/:id', tokenMiddleware, controller.getUsers);

module.exports = router;
