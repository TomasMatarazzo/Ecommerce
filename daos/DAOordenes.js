
const orden = require('../models/Orden.js');
const DAOMongoDB = require('./DAOMongo.js')

class DAOordenes extends DAOMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , orden);
    }
}

module.exports = DAOordenes;