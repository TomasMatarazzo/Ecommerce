const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('error');
const User = require('../models/User.js')
const Orden = require('../models/orden')
const ApiCarrito = require('../negocio/apiCarrito')
const apiCarrito = new ApiCarrito()
const ApiOrdenes = require('../negocio/apiOrdenes')
const apiOrdenes = new ApiOrdenes()


exports.createOrden = async function(req,res){
    // NO ES NECESARIO PARA EL ID YA QUE SE ENCUENTRA EN EL TOKEN.
    const userId = req.user._id 
    let carrito = await apiCarrito.getCarrito(userId)
    let user = await User.findById(userId) 
    let compras = []
    carrito.products.forEach( (item)=>{
        compras.push(item)
    })
    
    await apiOrdenes.newOrden(compras,1,'matarazzo')
    res.send('orden realizada')
    // creo la orden y mando mensaje y listo
     

    // Solo puedo crear la orden si el usuario esta logueado
}