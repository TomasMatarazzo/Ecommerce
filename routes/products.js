const express = require('express');
const Router = express.Router();
const {validateProductId , validateProductBody} = require('../validators/products.js')
const productController = require('../controllers/productController');


Router.get('/',productController.getProducts);
Router.post('/', validateProductBody ,productController.addProduct);
Router.get('/:id',validateProductId,productController.getProductById);
Router.put('/:id',validateProductId, validateProductBody,productController.updateProduct); // checkear si funciona este
Router.delete('/:id',validateProductId, productController.updateProduct);

module.exports = Router;