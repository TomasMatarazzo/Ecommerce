// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../models/persistencia.js');
const Carrito = require('../models/carrito.js');
const Product = require('../models/product.js');
const ContenedorFirebase = require('../contenedores/ContenedorFirebase.js')

var path = require('path');

const db = new ContenedorFirebase();

exports.newCarrito = async (req,res)=>{
    const carrito = new Carrito();
    await db.addElement(carrito);
    let cant = await db.getAll();
    cant = cant.length - 1;
    res.status(200).json({id:cant});
}

exports.showCarrito = async (req,res)=>{
    res.send(await db.getAll())
}

exports.productDeleteById = async(req,res) =>{
    const id = req.params.id;
    await db.deleteById(id);
    res.status(200).json({message:"Se borro el carrito"});
}

exports.showProductFromCarrito = async (req,res) =>{
    // agarra un carrito y te devuelvo los productos
    const id =req.params.id;
    console.log(id);
    const carrito = await db.getById(id
        );
    res.send(carrito.products);
}

exports.newProductFromCarrito = async (req,res) =>{
    //falta validacion;
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    const carrito = await db.getById(id);
    carrito.products.push(product);
    await db.updateById(id,carrito);
    res.status(200).json({message:"Se cargo el nuevo producto en el carrito"});
}

exports.updateProductFromCarrito = async(req,res) =>{
    //falta validacion
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.updateById(id,product);
    res.status(200).json({message:"Se actualizo el producto en el carrito"});
}

exports.deleteProductFromCarrito = async(req,res) =>{
    const idCarrito = req.params.id;
    const idProducto = req.params.idProduct;
    const carrito = await db.getById(idCarrito);
    carrito.products = carrito.products.filter( (product) => product.id != idProducto);
    await db.updateById(idCarrito,carrito);
    res.status(200).json({message:"Se elimino el producto dentro del carrito"});
}

