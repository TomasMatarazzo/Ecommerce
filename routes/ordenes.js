const express = require('express');
const Router = express.Router();
const ordenesController = require('../controllers/ordenesController.js');
const passport = require('passport')

Router.post('/', passport.authenticate('jwt', { session: false }) ,ordenesController.createOrden);
//Router.get('/:id', ordenesController.getOrden)
//Router.get('/:id', ordenesController.getAllOrdenes)

module.exports = Router 