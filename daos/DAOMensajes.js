const Mensajes = require('../models/Mensajes');
const DAOMongoDB = require('./DAOMongo')
class DAOMensajes extends DAOMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , Mensajes);
    }
}

module.exports = DAOMensajes; 