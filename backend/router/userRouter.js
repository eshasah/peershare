const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get users controller
const userController = require('../controller/userController');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Check if logged in
router.get('/login/check', auth.authenticate, userController.isLoggedin);

// Get owner cars
router.get('/cars', auth.authenticate, userController.getCars);

// Get user information
router.get('/', auth.authenticate, userController.getUser);

// Get user 
router.get('/info', auth.authenticate, userController.getUserInfo);

router.get('/getAllUsersInfo', userController.getAllUsersInfo);

module.exports = router;