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

    toFirestore = () =>{
        return {
            timestamp: this.timestamp,
            products: this.products.map( product => product)
        }
    }

    fromFirestore = () =>{}
    
}


module.exports = Carrito;