const express = require('express');
const { Router } = express; 
const router = Router();
const cartController = require('../controllers/carrito.controller');

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
// Crea un carrito y devuelve su id
router.post("/",validarAdministrador, cartController.newCart);

// Vacía un carrito y lo elimina
router.delete("/:id", cartController.deleteCart);

// Permite listar todos los productos guardados en el carrito
router.get('/:id?', cartController.getCarts);

router.get('/:id/productos', cartController.getProducts);

// Permite incorporar productos al carrito por su id de producto
router.post('/:id/productos', cartController.addProduct);

// Elimina un producto del carrito por su id de producto
router.delete('/:id/productos/:idProd', cartController.deleteProduct);

module.exports = router; 