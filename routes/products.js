const express = require('express');
const Router = express.Router();
const productController = require('../controllers/productController');


Router.get('/:id',productController.product_getById_GET);
Router.get('/',productController.product_list_GET);
Router.post('/',productController.product_add_POST);
Router.put('/:id',productController.product_update_PUT);
Router.delete('/:id', productController.product_deleteById_DELETE);

module.exports = Router;