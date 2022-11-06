const User = require('../models/User.js')
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
    let carritoString = compras.reduce( (acum , product) => acum +`Producto: ${product.name}\nCantidad: ${product.quantity}\n`, "")
    await apiOrdenes.carritoToString(req.user._id , carritoString)
    await apiOrdenes.newOrden(compras,1,'matarazzo') 
    await apiOrdenes.avisarWpp(req.user._id,carritoString)
}