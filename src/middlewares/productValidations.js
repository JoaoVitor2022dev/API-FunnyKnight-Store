const { body } = require("express-validator");

const productCreateValidation = () => { 
    return [ body("description").not().equals("undefined").withMessage("A descrição é obrigatório.").isLength({ min: 5 }).withMessage("A descrição precisa ter no minimo 5 letras"),
             body("productName").isString().withMessage("O nome do produto é obrigatório.").isLength({ min: 3 }).withMessage("o nome do produto deve ter no minimo 3 letras"),
             body("productSize").isString().withMessage("O tamanho do produto é obrigatório.").isLength({ min: 1 }).withMessage("Forneça o tamanho do produto. (M/P/G)"),
             body("color").isString().withMessage("A cor do produto é obrigatório.").isLength({ min: 4 }).withMessage("Insira a cor do produto"),
             body("price").isNumeric().withMessage("0 valor do produto é obrigatório.").isLength({ min: 1 }).withMessage("Insira a preço do produto"), 
             body("clothingAge").isNumeric().withMessage("A idade do usuario do produto é obrigatório.").isLength({ min: 1 }).withMessage("Insira a idade do usuario do produto"),
             body("image").custom((value, { req }) => {
            if (!req.file) {
                  throw new Error("A imagem é obrigatória");
            }
            return true;
        }), 
    ];
}; 
 
module.exports = {
    productCreateValidation,
}




