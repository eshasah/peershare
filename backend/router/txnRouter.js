const express = require('express');
// Get express router
const router = express.Router();

// Get users controller
const transaction = require('../controller/TxnController');

// Performs the transaction
router.post('/payment', transaction.performPayment);

//Get the balance
router.post('/getBalance',transaction.getBalance);

module.exports = router;