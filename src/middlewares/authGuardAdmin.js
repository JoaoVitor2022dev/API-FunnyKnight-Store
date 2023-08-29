const AdminUser = require('../models/AdminUser');
const jwt = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET; 

const authGuardAdmin = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]; 

    // checkif header has token 
    if(!token) return res.status(401).json({ errors: ["Acesso negado!"] }); 

    // check if token valid
     try {
   
      const verified = jwt.verify(token, jwtSecret); 
      
      req.user = await AdminUser.findOne({where: {id: verified.id },attributes: { exclude: ['password']}});

       next();  
     } catch (err) {
        res.status(401).json({ errors: ["Token invalido!"]}); 
     }
} 

module.exports = authGuardAdmin;
