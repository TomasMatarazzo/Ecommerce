const DAOOrdenes = require('../daos/DAOordenes.js')
const DAOUser= require('../daos/DAOUser.js')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
console.log(authToken)
const client = require('twilio')(accountSid, authToken);

class ApiOrdenes{

    constructor(){
        this.dao = new DAOOrdenes()
        this.daoUser = new DAOUser()
    }

    async newOrden(compras,nroOrden,emailComprador){
        const orden = {
            cart:compras,
            nro:nroOrden,
            fecha: Date.now(),
            estado:'generada',
            email:emailComprador }
        await this.dao.addElement(orden)
    }

    async avisarWpp(userId, compras){
        let {numero} = await this.daoUser.getById(userId)
        let wpp = `whatsapp:+549${numero}`
        let body = 'Gracias por confiar en nosotros \n Su pedido : \n' + compras
        client.messages.create({
            from: 'whatsapp:+14155238886',
            body,
            to: wpp
          }).then(message => console.log(message));
    }

    async getOrdenById(id){
        orden = await this.dao.getById(id)
        return orden
    }

    async carritoToString(id){
        let orden = await this.dao.getById(id);
        console.log(orden)
    }
    
}

module.exports = ApiOrdenes;
