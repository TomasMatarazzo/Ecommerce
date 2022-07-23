const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productController');


Router.get('/:id',productController.getProductById);
Router.get('/',productController.getProducts);
Router.post('/',productController.addProduct);
Router.put('/:id',productController.updateProduct);
Router.delete('/:id', productController.updateProduct);

module.exports = Router;