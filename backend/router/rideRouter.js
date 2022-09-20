const express = require('express');

const auth = require('./routerHelper/auth');
const owner = require('./routerHelper/owner');

// Get express router
const router = express.Router();

// Get rides controller
const rideController = require('../controller/rideController');

// Book Ride
router.post('/:id/book', borrower, rideController.bookRide);

// Complete a ride
router.post('/ride/:id/complete', borrower, rideController.completeRide);

// Get rides list
router.get('/', rideController.getRidesList);

// Get individual ride
router.get('/:id', rideController.getRide)


module.exports = router;