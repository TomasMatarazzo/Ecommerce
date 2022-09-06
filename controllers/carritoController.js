// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../models/persistencia.js');
const Carrito = require('../models/carrito.js');
const Product = require('../models/Producto.js');
const User = require('../models/User.js')
const ContenedorFirebase = require('../daos/DAOCarrito')
const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('/api/carrito');

var path = require('path');

const db = new ContenedorFirebase();

exports.newCarrito = async (req,res)=>{
    logger.info('get create carrito')
    const carrito = new Carrito();
    await db.addElement(carrito.toFirestore());
    let cant = await db.getAll();
    cant = cant.length - 1;
    res.json({id:cant});
}

exports.showCarrito = async (req,res)=>{
    logger.info('get show carrito')
    res.send(await db.getAll())
} 

exports.productDeleteById = async(req,res) =>{
    logger.info('route = /:id DELETE ')
    const id = req.params.id;
    try{
        await db.deleteById(id);
        res.json({message:"Se borro el carrito"});
    }
    catch{
        res.status(500).json({message:"Error"});
    }
}

exports.showProductFromCarrito = async (req,res) =>{
    // agarra un carrito y te devuelvo los productos
    const id =req.params.id;
    try{
        const carrito = await db.getById(id);
        res.send(carrito.products);
    }
    catch(e){
        res.status(500).json({message:"Error"});
    }
}

exports.newProductFromCarrito = async (req,res) =>{
    //falta validacion;
    // Agregamos al carrito del usuario un producto ya existente
    logger.info('route = /:id/products/:idProduct POST ')
    const productId = req.params.idProduct 

    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token,process.env.JWT_KEY)
    const userId = decodedToken.user._id
    if (!token || !userId) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(userId)


    const product = await Product.findById(productId)
    // validar el id del producto
    user.cart = user.cart.concat(productId)
    await user.save()
 
    res.json(user)
    //res.json({message:"Se cargo el nuevo producto en el carrito"});

}

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    } 
    return null
}

exports.updateProductFromCarrito = async(req,res) =>{
    //falta validacion
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.updateById(id,product);
    res.json({message:"Se actualizo el producto en el carrito"});
}

exports.deleteProductFromCarrito = async(req,res) =>{
    const idCarrito = req.params.id;
    const idProducto = req.params.idProduct;
    const carrito = await db.getById(idCarrito);
    carrito.products = carrito.products.filter( (product) => product.id != idProducto);
    await db.updateById(idCarrito,carrito);
    res.json({message:"Se elimino el producto dentro del carrito"});
}

