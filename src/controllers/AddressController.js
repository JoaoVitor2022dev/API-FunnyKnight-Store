const Address = require("../models/Address"); 

const insertAddress = async (req, res) => {
  const {street, city, state, postalCode } = req.body; 

try {
    const newAddress = await Address.create({street, city, state, postalCode }); 

    if (!newAddress) {
            return res.status(422).json({ errors: ["Ocorreu um erro, tente mais tarde."] }); 
    } 
 
    res.status(201).json(newAddress);
} catch (error) {
        res.state(401).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    }
}; 

module.exports = {
    insertAddress
}