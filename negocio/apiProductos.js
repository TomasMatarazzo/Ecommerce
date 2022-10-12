const DAOProductos = require('../daos/DAOProductos.js');
const Product = require('../models/Producto.js');

class ApiProductos{

    constructor(){
        this.dao = new DAOProductos('a')
    }

    async getProducts(){
        console.log('obtengo todos')
        const products = await this.dao.getAll()
        console.log(products)
        return products;
    }

    async getById(id){
        return this.dao.getById(id)
    }

    async addProduct(name,description,code,url,price,stock,id,category){
        const product = new Product({name,description,code,url,price,stock,id,category});
        await this.dao.addElement(product)
    }

    async updateProduct(name,description,code,url,price,stock,id){
        const product = new Product(name,description,code,url,price,stock);
        await this.dao.updateById(id,product);
    }

    async deleteProduct(id){
        await this.dao.deleteById(id);
    }

}

module.exports = ApiProductos;
