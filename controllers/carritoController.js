// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../models/persistencia.js');
const Carrito = require('../models/carrito.js');
const Product = require('../models/product.js');

var path = require('path');

const fileCarritos = new Persistencia(path.join(__dirname , '../') +  'models\\carritos.txt');

exports.newCarrito_POST = async (req,res)=>{
    const carrito = new Carrito();
    await fileCarritos.addElement(carrito);
    let cant = await fileCarritos.getAll();
    cant = cant.length - 1;
    res.send(" El id del producto nuevo es " + cant);
}

exports.showCarrito_GET = async (req,res)=>{
    res.send(await fileCarritos.getAll())
}

exports.product_deleteById_DELETE = async(req,res) =>{
    const id = parseInt(req.params.id);
    await fileCarritos.deleteById(id);
    res.send("Se borro el carrito con el id " + id);
}

exports.carrito_productos_GET = async (req,res) =>{
    // agarra un carrito y te devuelvo los productos
    const id = parseInt(req.params.id);
    console.log(id);
    const carrito = await fileCarritos.getById(id
        );
    res.send(carrito.products);
}

exports.carrito_productos_POST = async (req,res) =>{
    //falta validacion;
    const id = parseInt(req.params.id);
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    const carrito = await fileCarritos.getById(id);
    carrito.products.push(product);
    await fileCarritos.updateById(id,carrito);
    res.send("Se cargo el nuevo producto");
}

exports.carrito_update_PUT = async(req,res) =>{
    //falta validacion
    const id = parseInt(req.params.id);
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await fileCarritos.updateById(id,product);
    res.send("Se actualizo el producto")
}

exports.carrito_product_deleteById_DELETE = async(req,res) =>{
    const idCarrito = parseInt(req.params.id);
    const idProducto = parseInt(req.params.idProduct);
    const carrito = await fileCarritos.getById(idCarrito);
    carrito.products = carrito.products.filter( (product) => product.id != idProducto);
    await fileCarritos.updateById(idCarrito,carrito);
    res.send("Se elimino el producto dentro del carrito")
}

