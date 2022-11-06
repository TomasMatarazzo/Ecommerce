const ApiProductos = require('../negocio/apiProductos')
const log4js = require('log4js')
const logger = log4js.getLogger('/api/products');
const apiProductos = new ApiProductos()

exports.getProducts = async (req,res)=>{
    products =  await apiProductos.getProducts()
    res.send(products);
}

exports.getProductById = async (req,res) =>{
    logger.info('route = /:id GET')
    const id = req.params.idProduct;
    const product = await apiProductos.getById(id);
    let status = 202
    if ( product === "Producto inexistente"){
        status = 404
    }
    res.status(status).send(product)
}

exports.addProduct = async (req,res) =>{
    //falta validacion;
    logger.info('route = / POST')
    const { name,description,code,url,price,stock ,id,category} = req.body;
    apiProductos.addProduct({ name,description,code,url,price,stock ,id,category})
    res.json({message:"Se cargo el nuevo producto"}); 
}

exports.getProductByCategory = async (req,res) =>{
    logger.info('route = /category GET')
    const productos = await apiProductos.getProductByCategory(req.params.id)
    res.json(productos)
}

exports.updateProduct = async(req,res) =>{
    //falta validacion
    logger.info('route = / UPDATE')
    const id = req.params.idProduct;
    const { name,description,code,url,price,stock } = req.body;
    await apiProductos.updateProduct(name,description,code,url,price,stock,id)
    res.json({message:"Se actualizo el producto"});
    //obtengo elemento por el id
    // paso nuevo objecto como parametro y lo agrego;
}

exports.deleteProduct = async(req,res) =>{
    logger.info('route = / DELETE')
    const id = req.params.idProduct;
    await apiProductos.deleteProduct(id);
    res.json({message:"Se borro el producto"});
    // paso el id como parametro y lo borro a su puta madre
}