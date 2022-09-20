const express = require('express');

const auth = require('./routerHelper/auth');
const owner = require('./routerHelper/owner');

// Get express router
const router = express.Router();

// Get users controller
const userController = require('../controller/userController');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Check if logged in
router.get('/login/check', auth, userController.isLoggedin);

// Get owner cars
router.get('/cars', owner, userController.getCars);

// Get user information
router.get('/', auth, userController.getUser);

module.exports = router;