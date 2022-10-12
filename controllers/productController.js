// A diferencia de los ejercicios anteriores aplicamos una capa de abstraccion
// Cuando nos comunicamos con el modelo no accedemos a sus atributos directamente
// si no que lo hacemos mediante funciones.
const ApiProductos = require('../negocio/apiProductos')
const log4js = require('log4js')
const logger = log4js.getLogger('/api/products');
const apiProductos = new ApiProductos()

exports.getProducts = async (req,res)=>{
    console.log('todos')
    products =  await apiProductos.getProducts()
    res.send(products);
}

exports.getProductById = async (req,res) =>{
    logger.info('route = /:id GET')
    console.log('buscando id')
    const id = req.params.idProduct;
    console.log('el id es',id)
    const product = await apiProductos.getById(id);
    res.send(product)
}

exports.addProduct = async (req,res) =>{
    //falta validacion;
    logger.info('route = / POST')
    const { name,description,code,url,price,stock ,id,category} = req.body;
    apiProductos.addProduct({ name,description,code,url,price,stock ,id,category})
    res.json({message:"Se cargo el nuevo producto"}); 
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