const express = require('express');
const router = express.Router();

// controller 
const { insertAddress, updateAddress } = require('../controllers/AddressController');

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuard = require("../middlewares/authGuard");

// validation 
const { addressValidation, addressUpdateValidation } = require("../middlewares/addressValidations");

// Routes 
router.post("/register", authGuard, addressValidation(), validate , insertAddress);
router.patch("/update", authGuard, addressUpdateValidation(), validate, updateAddress); 

module.exports = router; 

