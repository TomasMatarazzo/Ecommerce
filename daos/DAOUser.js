const User = require('../models/User');
const DAOMongoDB = require('./DAOMongo')

class DAOUser extends DAOMongoDB{

    constructor(){
        const password = process.env.MONGO_PASSWORD;
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        super(mongoDB , User);
    }
}

module.exports = DAOUser; 