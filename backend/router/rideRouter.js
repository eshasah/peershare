const express = require('express');

const auth = require('../utilities/helper');

// Get express router
const router = express.Router();

// Get rides controller
const rideController = require('../controller/rideController');

// Book Ride
router.post('/:id/book', auth.authenticate, rideController.bookRide);

// Complete a ride
router.post('/ride/:id/complete', auth.authenticate, rideController.completeRide);

// Get rides list
router.get('/', rideController.getRidesList);

// Get individual ride
router.get('/:id', rideController.getRide)


module.exports = router;