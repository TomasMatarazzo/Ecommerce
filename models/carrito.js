const Product = require('./product.js');
const Persistencia = require('./persistencia.js');

class Carrito{

    constructor(){
        this.timestamp = Date.now();
        this.products = [];
    }

    addProduct(product){
        this.products.push(product);
    }

    
}


module.exports = Carrito;