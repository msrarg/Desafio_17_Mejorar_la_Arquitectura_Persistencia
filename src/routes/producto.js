const express = require('express');
const {Router} = express; 
const router = Router();
const productController = require('../controllers/producto.controller');

const validarAdministrador = (req, res, next) => {
    const path = req.originalUrl;
    const metodo = req.method;
    if (ADMIN !== true){
        return res.status(401).json({
            error: -1,
            descripcion:`ruta ${path} método ${metodo} no autorizada`
        });
    }
    next();
}

router.get('/:id?', productController.getProducts);

router.post("/",validarAdministrador, productController.postProduct);
 
router.put("/:id", validarAdministrador, productController.editProduct);

router.delete("/:id", validarAdministrador, productController.deleteProduct);

module.exports = router; 