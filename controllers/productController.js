// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.
const Product = require('../models/product.js');
const DAOProductos = require('../daos/DAOProductos.js');

var path = require('path');   

const db = new DAOProductos('a');

exports.product_list_GET = async (req,res)=>{
    const products = await db.getAll();
    console.log(products)
    res.send(products);
}

exports.product_getById_GET = async (req,res) =>{
    const id = req.params.id;
    const product = await db.getById(id);
    res.send(product)
}

exports.product_add_POST = async (req,res) =>{
    //falta validacion;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    console.log(product);
    await db.addElement(product)
    res.send("Se cargo el nuevo producto");
}

exports.product_update_PUT = async(req,res) =>{
    //falta validacion
    const id = req.params.id;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.updateById(id,product);
    res.send("Se actualizo el producto")
    //obtengo elemento por el id
    // paso nuevo objecto como parametro y lo agrego;
}

exports.product_deleteById_DELETE = async(req,res) =>{
    const id = req.params.id;
    await db.deleteBy(id);
    res.send("Se borro el producto");
    // paso el id como parametro y lo borro a su puta madre
}