const { body } = require("express-validator");

const userCreateValidation = () => { 
  return [ body("name").isString().withMessage("O nome é obrigatório.").isLength({ min: 3 }).withMessage("O nome precisa ter no minimo 3 caracteres"),
           body("email").isString().withMessage("O e-mail é obrigatório.").isEmail().withMessage("Insira um e-mail váido."),
           body("phone").isNumeric().withMessage("O número é obrigatório.").isLength({ min: 11 }).withMessage("O telefone precisa ser válido"),
           body("address").isString().withMessage("O endereço é obrigatório.").isLength({ min: 5 }).withMessage("Insira um endereço váido."),
           body("password").isString().withMessage("A senha é obrigatório.").isLength({ min: 5 }).withMessage("A senha deve ter no minimo 5 caracteris váido."),
           body("confirmPassword").isString().withMessage("A confirmação de senha é obrigatório")
           .custom((value, { req }) => {
    if (value != req.body.password) {
                throw new Error("As senhas não são iguais.");
        }
        return true;
    })
  ];
}; 

const userLoginValidation = () => { 
  return [ 
       body("email").isString().withMessage("O e-mail é obrigatório.").isEmail().withMessage("Insira um e-mail váido."),
       body("password").isString().withMessage("A senha é obrigatório."),
  ];
}; 

const userUpdateValidation = () => {
   return [
    body("name").optional().isLength({ min: 3 }).withMessage("O nome precisa ter no minimo 3 caracteres"),
    body("email").optional().isEmail().withMessage("Insira um e-mail váido."),
    body("phone").optional().isLength({ min: 11 }).withMessage("O telefone precisa ser válido"),
    body("address").optional().isLength({ min: 5 }).withMessage("Insira um endereço váido."),
    body("password").optional().isLength({ min: 5 }).withMessage("A senha deve ter no minimo 5 caracteris váido."),
   ]
};

module.exports = {
    userCreateValidation,
    userLoginValidation,
    userUpdateValidation
}

