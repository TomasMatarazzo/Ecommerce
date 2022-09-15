const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('error');
const User = require('../models/User.js')
const Orden = require('../models/orden')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.createOrden = async function(req,res){
    const userId = req.user._id 
    const user = await User.findById(userId) 
    let compras = []
    user.cart.forEach( (item)=>{
        compras.push(item[0])
    })
    fecha = new Date()
    const orden = {compras, direccion: user.direccion , fecha: fecha.getDate()}
    

    client.messages.create({
        from: 'whatsapp: +14155238886',
        body: 'Hicieron un pedido!',
        to: 'whatsapp: +5492266473122'
      }).then(message => console.log(message));

    res.send('orden realizada')
    // creo la orden y mando mensaje y listo
     

    // Solo puedo crear la orden si el usuario esta logueado
}