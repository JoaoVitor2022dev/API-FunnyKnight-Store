const { body } = require("express-validator");

const productCreateValidation = () => { 
    return [
        body("description").not().equals("undefined").withMessage("A descrição é obrigatória.").isLength({ min: 5 }).withMessage("A descrição precisa ter no mínimo 5 letras"),
        body("productName").isString().withMessage("O nome do produto é obrigatório.").isLength({ min: 3 }).withMessage("O nome do produto deve ter no mínimo 3 letras"),
        body("productSize").isString().withMessage("O tamanho do produto é obrigatório.").isLength({ min: 1 }).withMessage("Forneça o tamanho do produto. (M/P/G)"),
        body("color").isString().withMessage("A cor do produto é obrigatória.").isLength({ min: 4 }).withMessage("Insira a cor do produto"),
        body("price").isNumeric().withMessage("O valor do produto é obrigatório.").isLength({ min: 1 }).withMessage("Insira o preço do produto"), 
        body("productCode").isString().withMessage("O código do produto é obrigatório.").isLength({ min: 5 }).withMessage("O código do produto precisa ter no mínimo 5 caracteres"),
        body("clothingAge").isNumeric().withMessage("A idade do usuário do produto é obrigatória.").isLength({ min: 1 }).withMessage("Insira a idade do usuário do produto"),
        body("image").custom((value, { req }) => {
            if (!req.file) {
                throw new Error("A imagem é obrigatória");
            }
            return true;
        }), 
    ];
};  


module.exports = { 
    productCreateValidation
}


