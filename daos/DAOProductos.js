
const Product = require('../models/Producto');
const ContenedorMongoDB = require('../contenedores/ContenedorMongo')

class DAOProductos extends ContenedorMongoDB{

    constructor(){
        const password = 'm001-mongodb-basics';
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        console.log(mongoDB);
        super(mongoDB , Product);
    }
}

module.exports = DAOProductos;