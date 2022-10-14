const DAOOrdenes = require('../daos/DAOOrdenes')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

class ApiOrdenes{

    constructor(){
        this.dao = new DAOOrdenes()
    }

    async newOrden(compras,nroOrden,emailComprador){
        const orden = {
            cart:compras,
            nro:nroOrden,
            fecha: Date.now(),
            estado:'generada',
            email:emailComprador }
        let hola = await this.dao.addElement(orden)
        console.log(hola)
    }

    async avisarWpp(mensaje , emisor, receptor){
        client.messages.create({
            from: 'whatsapp: +14155238886',
            body: 'Hicieron un pedido!',
            to: 'whatsapp: +5492266473122'
          }).then(message => console.log(message));
    }

    async getOrdenById(id){
        orden = await this.dao.getById(id)
        return orden
    }

    
}

module.exports = ApiOrdenes;
