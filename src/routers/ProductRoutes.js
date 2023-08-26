const express = require('express');
const router = express.Router();

// controller 
const { insertProduct } = require('../controllers/ProductController');

// Middle de validaçoes de cada campo de dado
const { productCreateValidation } = require("../middlewares/productValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuard = require("../middlewares/authGuard");

// uploads photoProdutc 
const { imageUpload } = require("../middlewares/imageUpload");

// Routes 
router.post("/", authGuard, imageUpload.single("image"), productCreateValidation(), validate ,insertProduct);

module.exports = router; 
