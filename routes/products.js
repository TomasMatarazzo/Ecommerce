const express = require('express');
const Router = express.Router();
const {validateProductId , validateProductBody} = require('../validators/products.js')
const productController = require('../controllers/productController');


Router.get('/',productController.getProducts);
Router.post('/', validateProductBody ,productController.addProduct);
Router.get('/:idProduct',validateProductId,productController.getProductById);
Router.put('/:idProduct',validateProductId, validateProductBody,productController.updateProduct); // checkear si funciona este
Router.delete('/:idProduct',validateProductId, productController.updateProduct);

module.exports = Router; 