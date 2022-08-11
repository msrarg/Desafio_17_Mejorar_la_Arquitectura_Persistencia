const express = require('express');
const {Router} = express; 
const router = Router();

const productController = require('../src/controllers/producto.controller.js');
const validarAdministrador = require('../src/middlewares/validar-admin.js');

router.get(   '/:id?', productController.getProducts);
router.post(  '/',     validarAdministrador, productController.postProduct);
router.put(   '/:id',  validarAdministrador, productController.editProduct);
router.delete('/:id',  validarAdministrador, productController.deleteProduct);

module.exports = router; 