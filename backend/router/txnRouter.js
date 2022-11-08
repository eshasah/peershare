const express = require('express');

const auth = require('./routerHelper/auth');
const owner = require('./routerHelper/owner');

// Get express router
const router = express.Router();

// Get users controller
const transaction = require('../controller/TxnController');

// Performs the transaction
router.post('/payment', transaction.performPayment);

module.exports = router;