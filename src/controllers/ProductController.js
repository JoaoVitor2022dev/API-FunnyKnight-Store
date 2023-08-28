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
   const newProduct = await Product.create({ description, productName, productSize, color, price, availability, clothingAge, image, productCode }); 
   
   // if Product was created successfully, return data 
   if (!newProduct) {
        res.status(422).json({errors:["Houve um problema no nosso servidor, tente novamente mais tarde."]});
        return;  
   }
    res.status(201).json(newProduct); 
} catch (error) {
    res.status(401).json({ errors: ["Houve um problema no nosso servidor, por favor tente novamente mais tarde."]});  
    console.log(error);
}
}; 

const deleteProduct = async (req, res) => {
    const { id } = req.params; 
}

module.exports = {
    insertProduct
}

