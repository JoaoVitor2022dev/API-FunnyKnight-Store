const express = require('express');
const router = express.Router();

// controller 
const UserController = require('../controllers/UserController');

// Middle de validaçoes de cada campo de dado
const { userCreateValidation } = require("../middlewares/userValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// Routes 
router.post("/register", userCreateValidation(), validate, UserController.register);

module.exports = router; 
