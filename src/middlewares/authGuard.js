const User = require('../models/User');
const jwt = require('jsonwebtoken'); 
const jwtSecret = process.env.JWT_SECRET; 

module.exports = class authGuardtoken {
    static async authGuard(req, res, next){
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(" ")[1]; 
    
        // checkif header has token 
        if(!token) return res.status(401).json({ errors: ["Acesso negado!"] }); 
    
        // check if token valid
         try {
       
          const verified = jwt.verify(token, jwtSecret); 
          
          req.user = await User.findById(verified.id).select("-password");
    
          next();  
         } catch (err) {
            res.status(401).json({ errors: ["Token invalido!"] }); 
         }
    }
}

