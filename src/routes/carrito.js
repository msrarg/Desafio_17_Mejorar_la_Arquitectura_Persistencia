const express = require('express');
const { Router } = express; 
const router = Router();

const cartController       = require('../controllers/carrito.controller');
const validarAdministrador = require('../middlewares/validar-admin.js');

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