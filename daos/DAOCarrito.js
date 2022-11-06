const carrito = require('../models/Carritos');
const DAOMongoDB = require('./DAOMongo')

class DAOCarritos extends DAOMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , carrito);
    }

    async getCarrito(idUsuario){
        const carrito = await this.modelo.find({userId:idUsuario})
        return (carrito[0])
    }
}

module.exports = DAOCarritos; 