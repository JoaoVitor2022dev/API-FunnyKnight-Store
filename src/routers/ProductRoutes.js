const express = require('express');
const router = express.Router();

// controller 
const { insertProduct, deleteProduct, getAllProdutcs, getProdutcsById } = require('../controllers/ProductController');

// Middle de validaçoes de cada campo de dado
const { productCreateValidation } = require("../middlewares/productValidations");

// validation erros 
const validate = require("../middlewares/handleValidation");

// authGard
const authGuardAdmin = require("../middlewares/authGuardAdmin");

// uploads photoProdutc 
const { imageUpload } = require("../middlewares/imageUpload");

// Routes 
router.post("/insert", authGuardAdmin ,imageUpload.single("image") ,productCreateValidation() , validate , insertProduct);
router.delete("/:id", authGuardAdmin, deleteProduct); 
router.get("/all", getAllProdutcs); 
router.get("/:id", getProdutcsById); 

module.exports = router; 
