const express = require('express');
const router = express.Router();
const multer = require("multer"); 
const configMulter = require("../middlewares/multer");

// controller 
const { insertProduct, deleteProduct, getAllProdutcs, getProdutcsById, updateProduct } = require('../controllers/ProductController');

// Middle de validaçoes de cada campo de dado
const { productCreateValidation, productUpdateValidation } = require("../middlewares/productValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// Routes 
router.post("/insert", authGuardAdmin ,multer(configMulter).single('file'), productCreateValidation(), validate ,insertProduct ); 
router.delete("/:id", authGuardAdmin, deleteProduct); 
router.get("/all", getAllProdutcs); 
router.get("/:id", getProdutcsById); 
router.patch("/", authGuardAdmin, productUpdateValidation() ,validate, updateProduct); 

module.exports = router; 
