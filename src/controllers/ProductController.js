const Product = require("../models/Product"); 

const insertProduct = async (req, res) => {
 
    const { description, productName, productSize, color, price, availability, clothingAge } = req.body; 
    const image = req.file.filename;  

try {

   // create a photo 
   const newProduct = await Product.create({ description, productName, productSize, color, price, availability, clothingAge, image }); 
   
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

module.exports = {
    insertProduct
}

