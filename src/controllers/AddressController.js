const Address = require("../models/Address");
const User = require("../models/User");

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
        res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    }
}; 

const updateAddress = async (req, res) => {
    const { street, city, state, postalCode } = req.body;
    const reqUser = req.user;
   
try {
    const address = await Address.findOne({ where: { UserId: reqUser.id } }); 

    if (address) {
        if (street) {
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

        await address.save();

        res.status(200).json(address);
    } else {
        res.status(404).json({ message: "Endereço não encontrado." });
    }
} catch (error) {
       res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    }
};


const getAdressByToken = async (req, res) => {
   
    const reqUser = req.user;

    try {
        const address = await Address.findOne({ where: { UserId: reqUser.id } }); 

        res.status(200).json(address);    
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
    }
};

module.exports = {
    insertAddress,
    updateAddress,
    getAdressByToken
};