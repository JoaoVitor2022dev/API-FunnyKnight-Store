const AdminUser = require("../models/AdminUser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret_admin = process.env.JWT_SECRET_ADMIN; 

// Generate user Token 
const generateToken = (id) => { 
    return jwt.sign({id}, jwtSecret_admin, {
        expiresIn: "7d"
    });
};

// register user and sing in 
const registerAdminUser = async (req, res) => {
    
    const { name, email, password } = req.body;
    
    try {
        const dataExistInTable = await AdminUser.count();

        console.log(dataExistInTable);
        
        if (dataExistInTable > 0) {
            res.status(401).json({ errors: ["Faça Login para poder criar um novo Usuario Administrador"] });
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
             return res.status(422).json({ errors: ["Ocorreu um erro, tente mais tarde."] }); 
        } 
               
        return res.status(201).json({ id: newAdminUser.id, token: generateToken(newAdminUser.id) });
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro, por favor tente mais tarde"]});
    }    
}; 

const registerAdminUserAuth = async (req, res) => {
    
    const { name, email, password } = req.body;
    
    try {
        
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
        res.status(500).json({ errors: ["Ocorreu um erro, por favor tente mais tarde"]});
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
         res.status(422).json({ errors: [`${adminUser.name}, sua senha esta incorreta. :(`]});
         return;
    }
        // return user with token 
        return res.status(201).json({ id: adminUser.id, token: generateToken(adminUser.id)});  
    } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro, por favor tente mais tarde"]})
        console.log(error);
    }

}; 

const AdminUserUpdate = async (req, res) => {
    const { name, password, email } = req.body;
    const reqUser = req.user;

      try {

        const adminUser = await AdminUser.findOne({ where: reqUser.id , attributes: { exclude: ['password']}});
        
        if (!adminUser) {
            res.status(404).json({ errors: ["Usuário não encontrado"] });
            return;
        }

        if (name) {
            adminUser.name = name;
        }

        // Check email
        if (email && adminUser.email !== email) {
            const emailExists = await AdminUser.findOne({ where: { email }});

        if (emailExists) {
            res.status(400).json({ errors: ["Opa! Escolha outro e-mail, este e-mail já está em uso no nosso banco de dados."] });
                return;
        }
          adminUser.email = email;
        }

        if (password) {
            // Generate password hash
            const salt = await bcrypt.genSalt();
            const passwordHash = await bcrypt.hash(password, salt);

            adminUser.password = passwordHash;
        }

        await adminUser.save();

        res.status(200).json(adminUser);
      } catch (error) {
        res.status(500).json({ errors: ["Ocorreu um erro, tente novamente mais tarde."] });
      }
}; 


module.exports = { 
    registerAdminUser,
    registerAdminUserAuth, 
    loginAdminUser,
    AdminUserUpdate
}


