const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET; 

const authGuard = async (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(" ")[1]; 

    // checkif header has token 
    if(!token) return res.status(401).json({ errors: ["Acesso negado!"] }); 

    console.log(token);

    // check if token valid
     try {
   
      const verified = jwt.verify(token, jwtSecret); 
      
      req.user = await User.findOne({where: {id: verified.id },attributes: { exclude: ['password']}});

       next();  
     } catch (err) {
        res.status(401).json({ errors: ["Token invalido!"]}); 
     }
} 

module.exports = authGuard
