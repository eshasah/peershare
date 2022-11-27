const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get cars controller
const carController = require('../controller/carController');

// Add Car
router.post('/add', auth.authenticate, carController.addCar);

// Get cars list
router.get('/getAvailableCarsList', carController.getAvailableCarsList);

router.get('/getCarsList', carController.getCarsList);

// Get individual car
router.get('/get', carController.getCar);

// Get all cars by user id
router.get('/all', auth.authenticate, carController.getCarsByUser);

//Get Car by User Id
router.get('/getByUserId',auth.authenticate, carController.getCarByUserId);


module.exports = router;