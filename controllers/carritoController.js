const log4js = require('log4js')
const logger = log4js.getLogger('/api/carrito');
const ApiCarrito = require('../negocio/apiCarrito')
const apiCarrito = new ApiCarrito();

exports.show = async(req,res) =>{
  res.json({message:'se nashe'})
}

//devuelve el id del nuevo carrito

exports.createCarrito = async(req,res) =>{
  // creo carrito vacio.
  let userId = req.user._id
  const id = await apiCarrito.createCarrito(userId);
  res.json({id:id})
}

exports.addProductToCarrito = async (req,res)=>{
    let carritoId = req.user._id
    let productId = parseInt(req.params.idProduct) 
    await apiCarrito.addProductToCarrito(productId,carritoId)
    res.json({message:"Se agrego el nuevo producto al carrito"}) 
} 

exports.deleteProductFromCarrito = async (req,res)=>{

    // Validacion de token
    logger.info('route = /:idProduct DELETE ')
    const carritoId = req.params.id
    let productId = parseInt(req.params.idProduct) 
    await apiCarrito.deleteProductFrom(productId,carritoId)
    res.json({message:'Se borro un producto'})
  // await user.save()
  // const userCopy = JSON.parse(JSON.stringify(user))
  // delete userCopy.password
} 

