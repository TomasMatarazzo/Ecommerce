// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.

const Persistencia = require('../models/persistencia.js');
const Product = require('../models/product.js');
var path = require('path');

const fileProducts = new Persistencia(path.join(__dirname , '../') +  'models\\products.txt');

exports.product_list_GET = async (req,res)=>{
    const products = await fileProducts.getAll();
    res.send(products);
}

exports.product_getById_GET = async (req,res) =>{
    const id = parseInt(req.params.id);
    const product = await fileProducts.getById(id);
    res.send(product)
}

exports.product_add_POST = async (req,res) =>{
    //falta validacion;
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    console.log(product);
    await fileProducts.addElement(product)
    res.send("Se cargo el nuevo producto");
}

exports.product_update_PUT = async(req,res) =>{
    //falta validacion
    const id = parseInt(req.params.id);
    const { name,description,code,url,price,stock } = req.body;
    const product = new Product(name,description,code,url,price,stock);
    await fileProducts.updateById(id,product);
    res.send("Se actualizo el producto")
    //obtengo elemento por el id
    // paso nuevo objecto como parametro y lo agrego;
}

exports.product_deleteById_DELETE = async(req,res) =>{
    const id = parseInt(req.params.id);
    await fileProducts.deleteBy(id);
    res.send("Se borro el producto");
    // paso el id como parametro y lo borro a su puta madre
}