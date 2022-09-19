
const carrito = require('../models/Carritos');
const ContenedorMongoDB = require('../contenedores/ContenedorMongo')

class DAOCarritos extends ContenedorMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , carrito);
    }
}

module.exports = DAOCarritos;