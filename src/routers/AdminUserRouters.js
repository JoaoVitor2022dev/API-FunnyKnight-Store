const express = require('express');
const router = express.Router();

// controller 
const { registerAdminUser, loginAdminUser, registerAdminUserAuth, AdminUserUpdate } = require('../controllers/AdminUserController');

// Middle de validaçoes de cada campo de dado
const { userLoginValidation, userUpdateValidation } = require("../middlewares/userValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// auth token 
const authGuardAdmin= require("../middlewares/authGuardAdmin");

// Routes 
router.post("/register", userLoginValidation(), validate, registerAdminUser);
router.post("/login", userLoginValidation(), validate, loginAdminUser); 
router.post("/authregister", authGuardAdmin ,userLoginValidation(), validate, registerAdminUserAuth);
router.patch("/update", authGuardAdmin, userUpdateValidation(), validate, AdminUserUpdate); 

module.exports = router; 
