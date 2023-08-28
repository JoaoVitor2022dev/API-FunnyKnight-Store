const AdminUser = require("../models/AdminUser");
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

const registerAdminUser = async (req, res) => {
    
    const { name, email, password } = req.body;
    
    try {
        const dataExistInTable = await AdminUser.findAll();

        console.log(dataExistInTable);

       if (dataExistInTable.length <= 1) {
         res.status(401).json({ errors: ["Faça Login para poder criar um novo Usuario Administrador"] })
         return; 
       }

        if (!name) {
            res.status(401).json({ errors: ["O nome é obrigatorio!"] }); 
            return; 
        }

        const existingEmailAdminUser = await AdminUser.findOne({ where: { email } }); 

        if (existingEmailAdminUser) { 
            return res.status(401).json({ errors: ["Por favor, use outro email."] }); 
        } 

        const salt = await bcrypt.genSalt(); 
        const passwordHash = await bcrypt.hash(password, salt);
        
        const newAdminUser = await AdminUser.create({ name, email, password: passwordHash }); 
        
        if (!newAdminUser) {
             return res.status(422).json({ errors: ["Ocorreu um erro no nosso servidor tente mais tarde."] }); 
        } 
               
        return res.status(201).json({ id: newAdminUser.id, token: generateToken(newAdminUser.id) });
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro no nosso servidor, por favor tente mais tarde", error]});
    }    
}; 


const loginAdminUser = async (req, res) => { 
    
    const { email, password } = req.body; 

    try {
          const adminUser = await AdminUser.findOne({ where: { email } }); 
        
    // check if user exist
    if (!adminUser) {
        res.status(422).json({ errors: ["Usuário não encontrado."] })
        return
    }

    // check password is true
    if (!(await bcrypt.compare(password, adminUser.password))) {
         res.status(422).json({ errors: [`${user.adminUser}, sua senha esta incorreta. :(`]});
         return;
    }
        // return user with token 
        return res.status(201).json({ id: adminUser.id, token: generateToken(adminUser.id)});  
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro no nosso servidor, por favor tente mais tarde"]})
        console.log(error);
    }

}; 


module.exports = { 
    registerAdminUser, 
    loginAdminUser
}


