
const Product = require('../models/Producto');
const DAOMongoDB = require('./DAOMongo')

class DAOProductos extends DAOMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , Product);
    }
}

module.exports = DAOProductos;