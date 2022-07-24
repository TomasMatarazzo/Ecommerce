
const ContenedorFirebase = require('../contenedores/ContenedorFirebase')
const serviceAccount = require("../ecommerce-be1d1-firebase-adminsdk-gyi0f-9019de578c.json");

class DAOCarrito extends ContenedorFirebase{

    constructor(){
        super(serviceAccount);
    }
}

module.exports = DAOCarrito;