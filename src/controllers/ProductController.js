const Product = require("../models/Product"); 

const insertProduct = async (req, res) => {
    
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
    res.status(201).json(newProduct); 
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


module.exports = {
    insertProduct,
    deleteProduct
}


