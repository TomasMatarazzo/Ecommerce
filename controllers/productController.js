// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.
const Product = require('../models/product.js');
const DAOProductos = require('../daos/DAOProductos.js');

const jwt = require('jsonwebtoken')
const log4js = require('log4js')
const logger = log4js.getLogger('/api/products');

var path = require('path');   

const db = new DAOProductos('a');

exports.getProducts = async (req,res)=>{
    logger.info('route = / GET')
    const products = await db.getAll();
    res.send(products);
}

exports.getProductById = async (req,res) =>{
    logger.info('route = /:id GET')
    const id = req.params.idProduct;
    const product = await db.getById(id);
    res.send(product)
}

exports.addProduct = async (req,res) =>{
    //falta validacion;
    logger.info('route = / POST')
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.addElement(product)
    res.json({message:"Se cargo el nuevo producto"});
}

exports.updateProduct = async(req,res) =>{
    //falta validacion
    logger.info('route = / UPDATE')
    const id = req.params.idProduct;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await db.updateById(id,product);
    res.json({message:"Se actualizo el producto"});
    //obtengo elemento por el id
    // paso nuevo objecto como parametro y lo agrego;
}

exports.deleteProduct = async(req,res) =>{
    logger.info('route = / DELETE')
    const id = req.params.idProduct;
    await db.deleteBy(id);
    res.json({message:"Se borro el producto"});
    // paso el id como parametro y lo borro a su puta madre
}