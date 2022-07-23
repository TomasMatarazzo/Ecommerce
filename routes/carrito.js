const express = require('express');
const Router = express.Router();
const carritoController = require('../controllers/carritoController.js');

Router.post('/',carritoController.newCarrito);
Router.get('/',carritoController.showCarrito);
Router.delete('/:id',carritoController.productDeleteById);
Router.get('/:id/products', carritoController.showProductFromCarrito);
Router.post('/:id/products', carritoController.updateProductFromCarrito);
Router.delete('/:id/products/:idProduct',carritoController.deleteProductFromCarrito);

module.exports = Router;