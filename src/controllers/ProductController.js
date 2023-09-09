const Product = require("../models/Product"); 
const ProductImage = require("../models/ProductImage");

const insertProduct = async (req, res) => {    
 
    const {originalname: name, size, filename: key, url = "" } = req.file; 
    
    const productImage = await ProductImage.create({
         name, 
         size,
         key,
         url
    }); 

    const { description, productName, productSize, color, price, availability, clothingAge, productCode } = req.body; 
    const image = req.file.filename; 
    
try {

    const existingProductCode = await Product.findOne({ where: { productCode } }); 

    if (existingProductCode) {
        res.status(401).json({ errors: ["Esse codigo já está cadastrado à um produto"]})
        return; 
    }

   // create a photo 
   const newProduct = await Product.create({ 
           description, 
           productName, 
           productSize, 
           color, 
           price, 
           availability, 
           clothingAge, 
           image, 
           productCode, 
           AdminUserId: req.user.id 
        }); 

   // if Product was created successfully, return data 
   if (!newProduct) {
        res.status(500).json({errors:["Ocorreu um erro, tente novamente mais tarde."]});
        return;  
   }
    res.status(201).json({ product: newProduct, imageProduct: productImage }); 
} catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro ao criar o produto, por favor tente novamente mais tarde."]});  
}
}; 

const deleteProduct = async (req, res) => {
    const { id } = req.params; 
    const reqUser = req.user; 
    
    try {
        const product = await Product.findOne({ where: { id } }); 

        //  check exist product 
        if (!product) {
            res.status(404).json({ errors: ["O produto não encontrado!"] });
            return; 
        } 
        
        if (product.AdminUserId !== reqUser.id) {
            res.status(403).json({ errors: ["Você não tem permissão para excluir este produto."] });
            return; 
        }

        // Delete the product
        await product.destroy();

        res.status(200).json({ id: product.id, message: "Produto excluído com sucesso."}); 
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro ao excluir o produto."] });
    }
}; 


const getAllProdutcs = async (req, res) => {
  try {
    const products = await Product.findAll(); 

    res.status(200).json(products);  
  } catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
  }
}; 

const getProdutcsById = async (req, res ) => {
    
    const { id } = req.params; 

    try {
    const product = await Product.findOne({ where: { id } }); 

    if (!product) {
        res.status(422).json({  errors: ["O produto nao existe"] }); 
        return;  
    }

    res.status(200).json(product); 
    } catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });    
    }
}; 



const updateProduct = async (req, res) => {
  
    const { description, productName, productSize, color, price, clothingAge } = req.body; 

    const reqUser = req.user; 

    try {
        
        const product = await Product.findOne({ where: { id: reqUser.id } }); 

        if (!product) {
            res.status(200).json({ errors: ["O produto não existe."] }); 
            return; 
        }

        if (description) {
            product.description = description; 
        }

        if (productName) {
            product.productName = productName; 
        }

        if (productSize) {
            product.productSize = productSize;
        }

        if (color) {
            product.color = color; 
        }

        if(price){
           product.price = price;  
        }

        if (clothingAge) {
            product.clothingAge = clothingAge; 
        }

       await product.save();

    res.status(201).json(product); 
    } catch (error) {
    res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] }); 
    }

};

module.exports = {
    insertProduct,
    deleteProduct,
    getAllProdutcs,
    getProdutcsById,
    updateProduct,
}


