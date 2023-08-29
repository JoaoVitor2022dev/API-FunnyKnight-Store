const express = require('express');
const router = express.Router();

// controller 
const { insertAddress } = require('../controllers/AddressController');

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuard = require("../middlewares/authGuard");

// Routes 
router.post("/address", authGuard, validate ,insertAddress);

module.exports = router; 