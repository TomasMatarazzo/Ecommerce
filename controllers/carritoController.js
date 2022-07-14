// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../models/persistencia.js');
const Carrito = require('../models/carrito.js');
const Product = require('../models/product.js');
const ContenedorFirebase = require('../contenedores/ContenedorFirebase.js')

var path = require('path');

const db = new ContenedorFirebase();

exports.newCarrito_POST = async (req,res)=>{
    const carrito = new Carrito();
    await db.addElement(carrito);
    let cant = await db.getAll();
    cant = cant.length - 1;
    res.send(" El id del producto nuevo es " + cant);
}

exports.showCarrito_GET = async (req,res)=>{
    res.send(await db.getAll())
}

exports.product_deleteById_DELETE = async(req,res) =>{
    const id = req.params.id;
    await db.deleteById(id);
    res.send("Se borro el carrito con el id " + id);
}

exports.carrito_productos_GET = async (req,res) =>{
    // agarra un carrito y te devuelvo los productos
    const id =req.params.id;
    console.log(id);
    const carrito = await db.getById(id
        );
    res.send(carrito.products);
}

exports.carrito_productos_POST = async (req,res) =>{
    //falta validacion;
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    const carrito = await db.getById(id);
    carrito.products.push(product);
    await db.updateById(id,carrito);
    res.send("Se cargo el nuevo producto");
}

exports.carrito_update_PUT = async(req,res) =>{
    //falta validacion
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.updateById(id,product);
    res.send("Se actualizo el producto")
}

exports.carrito_product_deleteById_DELETE = async(req,res) =>{
    const idCarrito = req.params.id;
    const idProducto = req.params.idProduct;
    const carrito = await db.getById(idCarrito);
    carrito.products = carrito.products.filter( (product) => product.id != idProducto);
    await db.updateById(idCarrito,carrito);
    res.send("Se elimino el producto dentro del carrito")
}

