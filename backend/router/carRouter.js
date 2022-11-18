const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get cars controller
const carController = require('../controller/carController');

// Add Car
router.post('/add', auth.authenticate, carController.addCar);

// Get cars list
router.get('/', carController.getCarsList);

// Get individual car
router.get('/get', carController.getCar)


module.exports = router;