const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get rides controller
const rideController = require('../controller/rideController');

// Book Ride
router.post('/book', auth.authenticate, rideController.bookRide);

// Complete a ride
router.post('/complete', auth.authenticate, rideController.completeRide);

// Get rides list
router.get('/', rideController.getRidesList);

// Get individual ride
router.get('/get', rideController.getRide)

module.exports = router;