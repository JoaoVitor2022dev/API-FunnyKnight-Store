const multer = require('multer'); 
const path = require("path");

// Destination to store image 
const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {        
        // destino da imagem
        cb(null, `src/uploads/products/`); 
    },
    filename: (req, file, cb) => {  // Corrigido para 'filename'
        // mudar o nome do arquivo 
        cb(null, Date.now() + path.extname(file.originalname));
   }
});

const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb){
        if (!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            // upload only png and jpg formats 
            return cb(new Error("Por favor, apenas envie png ou jpeg ou jpg!"));
        }
        cb(undefined, true);
    }
});

module.exports = { imageUpload };