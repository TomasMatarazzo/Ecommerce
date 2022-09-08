const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('error');
const User = require('../models/User.js')

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

const getTokenFrom = req => {
    authorization = req.body.headers.Authorization
    console.log('nashi')
    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
      return authorization.substring(7) 
    } 
    return null 
}

exports.createOrden = async function(req,res){
    console.log('recibi orden');
    const token = getTokenFrom(req)
    console.log('token')
    console.log(token)
    const decodedToken = jwt.verify(token,process.env.JWT_KEY)
    const userId = decodedToken.user._id 
    console.log(token)
    if (!token || !userId) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    console.log(userId)
    const user = await User.findById(userId) 
    let compras = []
    user.cart.forEach( (item)=>{
        compras.push(item[0])
    })
    fecha = new Date()
    const orden = {compras, direccion: user.direccion , fecha: fecha.getDate()}
    console.log(orden)

    client.messages.create({
        from: 'whatsapp:+14155238886',
        body: 'Pedazo de trolita',
        to: 'whatsapp:+54922661261'
      }).then(message => console.log(message));
    // creo la orden y mando mensaje y listo
     

    // Solo puedo crear la orden si el usuario esta logueado
}