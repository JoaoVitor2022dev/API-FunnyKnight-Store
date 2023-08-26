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

const getCurrentUser = async (req, res) => {  
    
    const user = req.user; 
    
    res.status(200).json(user);
}; 

const userUpdate = async (req, res) => {
    const { name, address, password, phone, email } = req.body;
    const reqUser = req.user;

    try {
        const user = await User.findOne({ where: reqUser.id ,attributes: { exclude: ['password']}});
        
        if (!user) {
            res.status(404).json({ errors: ["Usuário não encontrado"] });
            return;
        }

        if (name) {
            user.name = name;
        }

        // Check phone
        if (phone && user.phone !== phone) {
            const phoneExists = await User.findOne({ where: { phone } });

            if (phoneExists) {
                res.status(400).json({ errors: ["Opa! Escolha outro número, este número já está em uso no nosso banco de dados."] });
                return;
            }

            user.phone = phone;
        }

        // Check email
        if (email && user.email !== email) {
            const emailExists = await User.findOne({ where: { email }});

        if (emailExists) {
            res.status(400).json({ errors: ["Opa! Escolha outro e-mail, este e-mail já está em uso no nosso banco de dados."] });
                return;
        }
            user.email = email;
        }

        if (address) {
            user.address = address;
        }

        if (password) {
            // Generate password hash
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }

        await user.save();

        res.status(200).json(user);

    } catch (error) {
        console.error(error);
        res.status(500).json({ errors: ["Ocorreu um erro no nosso servidor, por favor tente mais tarde"] });
    }
};

module.exports = {
    register,
    login,
    getCurrentUser,
    userUpdate
}

