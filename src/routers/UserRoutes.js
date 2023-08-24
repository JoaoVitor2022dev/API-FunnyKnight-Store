const express = require('express');
const router = express.Router();

// controller 
const { register, login, getCurrentUser, getUserById } = require('../controllers/UserController');

// Middle de validaçoes de cada campo de dado
const { userCreateValidation, userLoginValidation } = require("../middlewares/userValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuard = require("../middlewares/authGuard");

// Routes 
router.post("/register", userCreateValidation(), validate, register);
router.post("/login", userLoginValidation(), validate, login); 
router.get("/", authGuard, getCurrentUser);
router.get("/:id", getUserById); 

module.exports = router; 
