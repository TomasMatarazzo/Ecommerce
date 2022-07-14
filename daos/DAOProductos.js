
const mongoose = require('mongoose');
const Product = require('../models/Producto');

class ContenedorMongoDB{

    constructor(mongoDBUrl){
        mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        //this.getById('62cfab0da1462120bf2b4bdb')
    }

    async addElement(o){
        console.log('agregando zapas')
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            const newProduct = new Product(o);
            await newProduct.save();
            console.log(newProduct)
            return newProduct._id.toString()
        }
        catch(e){
            console.log('No se pudo grabar el objeto',e);
            return null
        }
    }


    
    async getById(id){
    
        try{   
            console.log('se busco el elemento')     
            const element = await Product.findById(id);
            return element;
        }
        catch(e){
            console.log(e)
            return 
        }
    }

   updateById(id , product){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        Product.findByIdAndUpdate(id,product, function(err, result){

            if(err){
                console.log(err)
            }
            else{
                console.log('Se actualizo el elemento')
            }
        })
    }

    async getAll(){
        try{        
            const elementos = await Product.find({})
            return elementos
        }
        catch(e){
            console.log(e)
            return 
        }

    }
 
    async deleteById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        // si no esta el id se reescribe la misma informacion
        try{
            await Product.findByIdAndRemove(id)
        }
        catch(e){
            console.log(e)
        }

    }

    async deleteAll(){
        try{
            await Product.remove()
        }
        catch(e){
            console.log(e)
        }
    }
}

class DAOProductos extends ContenedorMongoDB{

    constructor(url){
        const password = 'm001-mongodb-basics';
        const mongoDB = 'mongodb+srv://m001-student:' + password + '@sandbox.azv9a.mongodb.net/?retryWrites=true&w=majority';
        console.log(mongoDB);
        super(mongoDB);
    }
}

module.exports = DAOProductos;