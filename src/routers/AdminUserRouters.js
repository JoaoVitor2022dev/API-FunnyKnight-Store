const express = require('express');
const router = express.Router();

// controller 
const { registerAdminUser, loginAdminUser } = require('../controllers/AdminUserController');

// Middle de validaçoes de cada campo de dado
const { userLoginValidation } = require("../middlewares/userValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// Routes 
router.post("/adminlogin", userLoginValidation(), validate, registerAdminUser);
router.post()

module.exports = router; 
