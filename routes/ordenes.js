const express = require('express');
const Router = express.Router();
const ordenesController = require('../controllers/ordenesController.js');


Router.post('/',ordenesController.createOrden);

module.exports = Router 