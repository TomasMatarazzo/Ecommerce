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
const mongoose = require('mongoose')
const { ObjectId } = require( 'mongoose');

var path = require('path');

const db = new ContenedorFirebase();

const getTokenFrom = req => {
    authorization = req.body.headers.Authorization
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    } 
    return null
}

exports.addProductToCarrito = async (req,res)=>{


    // Validacion del token
    logger.info('route = /:idProduct POST ')
    let productId = req.params.idProduct 
    console.log(productId)
    const token = getTokenFrom(req)
    const decodedToken = jwt.verify(token,process.env.JWT_KEY)
    const userId = decodedToken.user._id
    if (!token || !userId) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }
    // Creamos objeto a agregar
    const user = await User.findById(userId) 
    productId = parseInt(productId)
    const producto = await Product.find({id:productId })
    const {name,description,price,category} = producto[0]
    newObject = {name , description,price,category}
    newObject = {...newObject, quantity:1 ,id: productId}

    //id2 = mongoose.mongo.ObjectId(productId)

    // Verificamos si es objeto repetido o no
    isRepeated = user.cart.find(item =>item[0].id == productId )
    if (!isRepeated){
      const obj = new Product(newObject)
      user.cart = user.cart.concat(obj)
    }
    else{
      prueba = user.cart.map( (item)=> {
        newItem = {...newObject,quantity: ++item[0].quantity }
        newItem = new Product(newItem)
        return item[0].id == productId ? newItem: item})
      user.cart = prueba
    }

  await user.save()
  res.json(user) 
} 

exports.deleteProductFromCarrito = async (req,res)=>{

    // Validacion de token
    logger.info('route = /:idProduct POST ')
    console.log(req.params)
    console.log('acaaaaaaaaaaaaaaaa')
    // const productId = req.params.idProduct 
    // console.log(productId)
    // const token = getTokenFrom(req)
    // const decodedToken = jwt.verify(token,process.env.JWT_KEY)
    // console.log('aca')
    // const userId = decodedToken.user._id
    // if (!token || !userId) {
    //   return res.status(401).json({ error: 'token missing or invalid' })
    // }
  //   console.log('aqui9')
  //   // Verificamos si se encuentra repetido
  //   const user = await User.findById(userId) 
  //   id2 = mongoose.mongo.ObjectId(productId)

  //   // Lo que hago aca es restarle al producto la cantidad de 1 si coincide con el id,
  //   // luego si esa cantidad es de 0 lo elimino.
  //   prueba = user.cart.map( (item)=> {
  //       newItem = {...newObject,quantity: --item[0].quantity }
  //       newItem = new Product(newItem)
  //       console.log(newItem)
  //       return item[0].id == id2 ? newItem: item})
  //   prueba = prueba.filter( item[0].quantity !== 0)
  //   user.cart = prueba

  // await user.save()
  // res.json(user) 
} 

// exports.showCarrito = async (req,res)=>{
//     logger.info('get show carrito')
//     res.send(await db.getAll())
// } 

// exports.productDeleteById = async(req,res) =>{
//     logger.info('route = /:id DELETE ')
//     const id = req.params.id;
//     try{
//         await db.deleteById(id);
//         res.json({message:"Se borro el carrito"});
//     }
//     catch{
//         res.status(500).json({message:"Error"});
//     }
// }

// exports.showProductFromCarrito = async (req,res) =>{
//     // agarra un carrito y te devuelvo los productos
//     const id =req.params.id;
//     try{
//         const carrito = await db.getById(id);
//         res.send(carrito.products);
//     }
//     catch(e){
//         res.status(500).json({message:"Error"});
//     }
// }

// exports.newProductFromCarrito = async (req,res) =>{
//     //falta validacion;
//     // Agregamos al carrito del usuario un producto ya existente
//     logger.info('route = /:id/products/:idProduct POST ')
//     const productId = req.params.idProduct 

//     const token = getTokenFrom(req)
//     const decodedToken = jwt.verify(token,process.env.JWT_KEY)
//     const userId = decodedToken.user._id
//     if (!token || !userId) {
//       return res.status(401).json({ error: 'token missing or invalid' })
//     }
//     const user = await User.findById(userId)


//     const product = await Product.findById(productId)
//     // validar el id del producto
//     user.cart = user.cart.concat(productId)
//     await user.save()
 
//     res.json(user)
//     //res.json({message:"Se cargo el nuevo producto en el carrito"});

// }

// exports.updateProductFromCarrito = async(req,res) =>{
//     //falta validacion
//     const id = req.params.id;
//     const { name,description,code,url,price,stock } = req.body;
//     const product = new Product(name,description,code,url,price,stock);
//     await db.updateById(id,product);
//     res.json({message:"Se actualizo el producto en el carrito"});
// }

// exports.deleteProductFromCarrito = async(req,res) =>{
//     const idCarrito = req.params.id;
//     const idProducto = req.params.idProduct;
//     const carrito = await db.getById(idCarrito);
//     carrito.products = carrito.products.filter( (product) => product.id != idProducto);
//     await db.updateById(idCarrito,carrito);
//     res.json({message:"Se elimino el producto dentro del carrito"});
// }

