const DAOProductos = require('../daos/DAOProductos.js');
const Product = require('../models/Producto.js');

class ApiProductos{

    constructor(){
        this.dao = new DAOProductos('a')
    }

    async getProducts(){
        const products = await this.dao.getAll()
        return products;
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

    async getProductByCategory(category){
        const products = await this.dao.getAll();
        let productCategory = products.find( product => product.category === parseInt(category))
        if (productCategory === undefined){
            productCategory = []
        }
        return productCategory
    }

    // el getById no trabaja con mongoDB si no que es un id entero
    async getById(id){
        const products = await this.dao.getAll();
        let product = products.find( product => product.id === parseInt(id))
        if (product === undefined){
            product = "Producto inexistente"
        }
        return product
    }

}

module.exports = ApiProductos;
