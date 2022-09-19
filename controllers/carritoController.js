// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../daos/persistencia.js');
const Carrito = require('../daos/DAOCarritoFirestore.js');
const Product = require('../models/Producto.js');
const User = require('../models/User.js')
const DAOCarrito = require('../daos/DAOCarrito')
const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('/api/carrito');
const mongoose = require('mongoose')
const { ObjectId } = require( 'mongoose');

var path = require('path');

const db = new DAOCarrito();

exports.show = async(req,res) =>{

  res.json({message:'se nashe'})
}

//devuelve el id del nuevo carrito

exports.createCarrito = async(req,res) =>{
  // uso contenedor de mongo carrito
  // creo carrito vacio.
  let userId = req.user._id
  const carrito = {
    userId: userId,
    timestamp: Date.now(),
    products: []
  }
  const id = await db.addElement(carrito);
  res.json({id:id})
}

exports.addProductToCarrito = async (req,res)=>{

    let carritoId = req.params.id
    let productId = parseInt(req.params.idProduct) 
    // Creamos objeto a agregar
    const producto = await Product.find({id:productId})
    const carrito = await db.getById(carritoId)
    const {name,description,price,category} = producto[0]
    newObject = {name,description,price,category}
    newObject = {...newObject, quantity:1 ,id: productId}
    let productos = carrito.products

    isRepeated = productos.find(item =>item.id == productId)
    if (!isRepeated){
      const product = new Product(newObject)
      productos.push(product)
    }
    else{
      console.log('no es repetido')
      productos = productos.map( (item)=> {
        newItem = {...newObject,quantity: ++item.quantity }
        newItem = new Product(newItem)
        return item.id == productId ? newItem: item})
      //user.cart = prueba
    }
  db.updateById(carritoId,{products:productos})
  res.json({message:"hola"}) 
} 

exports.deleteProductFromCarrito = async (req,res)=>{

    // Validacion de token
    logger.info('route = /:idProduct DELETE ')
    
    const carritoId = req.params.id
    let productId = parseInt(req.params.idProduct) 

    const carrito = await db.getById(carritoId)
    let products = carrito.products
    products = products.map( item => {
        newItem = {...item}
        newItem.quantity--
        newItem = new Product(newItem)
        return item.id === productId ? newItem: item
      })
    products = products.filter( (item) => item.quantity !== 0)
    db.updateById(carritoId,{products})
  // await user.save()
  // const userCopy = JSON.parse(JSON.stringify(user))
  // delete userCopy.password
    res.json({message:'se resolvio muy bien'}) 
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

