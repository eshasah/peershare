const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get rides controller
const rideController = require('../controller/rideController');

// Book Ride
router.post('/bookRide', rideController.bookRide);

// Complete a ride
router.post('/complete', auth.authenticate, rideController.completeRide);

// Get rides list
router.get('/getUserTripDetails', rideController.getRidesList);

// Get individual ride
router.get('/get', rideController.getRide)

//Get Rides for car

router.get('/cars',rideController.getRidesForCar);


module.exports = router;