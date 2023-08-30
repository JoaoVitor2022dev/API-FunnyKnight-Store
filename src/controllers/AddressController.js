const Address = require("../models/Address");

const insertAddress = async (req, res) => {
    const { street, city, state, postalCode } = req.body; 

    try {
        const newAddress = await Address.create({ 
            street,
            city,
            state, 
            postalCode,   
            UserId: req.user.id 
        }); 

        if (!newAddress) {
            return res.status(422).json({ errors: ["Ocorreu um erro, tente mais tarde."] }); 
        }

        res.status(201).json(newAddress);
    } catch (error) {
        res.status(401).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    }
}; 

const updateAddress = async (req, res) => {
    
    const { street, city, state, postalCode } = req.body; 

    // try {
         
    if (address) {
       address.street = street;       
    }

    if (city) {
        address.city = city; 
    }

    if (state) {
        address.state = state;
    }

    if (postalCode) {
        address.postalCode = postalCode; 
    }

    // } catch (error) {
    //     res.status(401).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    // }
};

module.exports = {
    insertAddress,
    updateAddress
};