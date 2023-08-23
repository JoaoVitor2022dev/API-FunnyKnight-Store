const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET; 

// Generate user Token 
const generateToken = (id) => { 
    return jwt.sign({id}, jwtSecret, {
        expiresIn: "7d"
    });
};

// register user and sing in 
const register = async (req, res) => {
    const { name, email, phone, address, password} = req.body;
    
    const existingEmailUser = await User.findOne({ where: { email } }); 

    if (existingEmailUser) { 
        return res.status(401).json({ errors: ["Por favor, use outro email."] }); 
    } 
    
    const existingPhoneUser = await User.findOne({ where: { phone } });
    
    if (existingPhoneUser) {
         return res.status(401).json({ errors: ["Por favor, use outro número para contato."] });
        }
    // Generate password hash 
    const salt = await bcrypt.genSalt(); 
    const passwordHash = await bcrypt.hash(password, salt);
    
    const newUser = await User.create({ name, email, address, phone, password: passwordHash }); 
    
    if (!newUser) {
         return res.status(422).json({ errors: ["Ocorreu um erro no nosso servidor tente mais tarde."] }); 
    } 
           
    return res.status(201).json({ id: newUser.id, token: generateToken(newUser.id) });
}

module.exports = {
    register
}