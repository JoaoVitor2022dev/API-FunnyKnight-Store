const { body } = require("express-validator");

const addressValidation= () => {
    return [
     body("street").isString().withMessage("o nome da rua  é obrigatório.").isLength({ min: 5 }).withMessage("O nome da rua precisa ter no minimo 5 caracteres"),
     body("city").isString().withMessage("O nome da cidade é obrigatório.").isLength({ min: 3 }).withMessage("O nome da cidade precisa ter no minimo 3 caracteres"),
     body("state").isString().withMessage("O nome do estado é obrigatório.").isLength({ min: 3 }).withMessage("O nome do estado precisa ter no minimo 3 caracteres"),
     body("postalCode").isString().withMessage("O numero da Cep é obrigatório.").isLength({ min: 1 }).withMessage("Insira o número da casa ou apartamento")
    ]
};


const addressUpdateValidation= () => {
    return [
     body("street").optional().isLength({ min: 5 }).withMessage("O nome da rua precisa ter no minimo 5 caracteres"),
     body("city").optional().isLength({ min: 3 }).withMessage("O nome da cidade precisa ter no minimo 3 caracteres"),
     body("state").optional().isLength({ min: 3 }).withMessage("O nome do estado precisa ter no minimo 3 caracteres"),
     body("postalCode").optional().isLength({ min: 1 }).withMessage("Insira o número da casa ou apartamento")
    ]
};

module.exports = {
    addressValidation,
    addressUpdateValidation
}