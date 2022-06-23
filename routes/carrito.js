const express = require('express');
const Router = express.Router();
const carritoController = require('../controllers/carritoController.js');

Router.post('/',carritoController.newCarrito_POST);
Router.get('/',carritoController.showCarrito_GET);
Router.delete('/:id',carritoController.product_deleteById_DELETE);
Router.get('/:id/products', carritoController.carrito_productos_GET);
Router.post('/:id/products', carritoController.carrito_productos_POST);
Router.delete('/:id/products/:idProduct',carritoController.carrito_product_deleteById_DELETE);

module.exports = Router;