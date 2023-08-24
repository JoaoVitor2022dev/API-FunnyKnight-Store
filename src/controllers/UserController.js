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
     
    try {
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
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro no nosso servidor, por favor tente mais tarde"]})
        console.log(error);
    }
}

const login = async(req, res) => {
     
    const { email, password } = req.body; 

    try {
          const user = await User.findOne({ where: { email } }); 
        
    // check if user exist
    if (!user) {
        res.status(422).json({ errors: ["Usuário não encontrado."] })
        return
    }

    // check password is true
    if (!(await bcrypt.compare(password, user.password))) {
         res.status(422).json({ errors: [`${user.name}, sua senha esta incorreta. :(`]});
         return;
    }

        // return user with token 
        return res.status(201).json({ id: user.id, token: generateToken(user.id)});  
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro no nosso servidor, por favor tente mais tarde"]})
        console.log(error);
    }
};

//  get current logged in user 
const getCurrentUser = async (req, res) => {  
    
    const user = req.user; 
    
    res.status(200).json(user);
}; 

// Get user by id 

const getUserById = async (req, res) => {
    const { id } = req.params
 
    try {
       const user = await User.findByPk(id, { attributes: { exclude: ['password'] }});
 
       // check if user exist 
       if (!user) {
       res.status(404).json({ erros: ["Usuário nao encontrado."] });
       return
       }
 
       res.status(200).json(user);
 
    }catch (error) {
       res.status(404).json({ erros: ["Usuário nao existe."] });
    }
 }


module.exports = {
    register,
    login,
    getCurrentUser,
    getUserById
}