const Persistencia = require('./persistencia.js');

class Product{
    constructor(name,description,code,imageUrl,price, stock){
        this.timestamp = Date.now();
        this.name =  name;
        this.description = description;
        this.code = code;
        this.image = imageUrl;
        this.price = price;
        this.stock = stock;
    }

}

module.exports = Product;









