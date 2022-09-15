const express = require('express');
const Router = express.Router();
const carritoController = require('../controllers/carritoController.js');
const validateCarritoId = require('../validators/carrito');
const {validateProductBody, validateProductId} = require('../validators/products')
const passport = require('passport')

Router.post('/show', passport.authenticate('jwt', { session: false }), carritoController.show);
Router.post('/:idProduct', passport.authenticate('jwt', { session: false }) , carritoController.addProductToCarrito);
// Router.delete('/:idProduct', validateCarritoId ,carritoController.productDeleteById);
// Router.get('/',carritoController.showCarrito);
// Router.get('/:id/products',validateCarritoId, carritoController.showProductFromCarrito);
// Router.post('/:id/products', validateCarritoId, validateProductBody,carritoController.updateProductFromCarrito);
// Router.delete('/:id/products/:idProduct',validateCarritoId,validateProductId,validateProductBody,carritoController.deleteProductFromCarrito);
// Router.post('/:id/products/:idProduct', carritoController.newProductFromCarrito);
module.exports = Router;   