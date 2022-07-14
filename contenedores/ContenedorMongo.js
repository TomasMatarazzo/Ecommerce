const mongoose = require('mongoose');
const Product = require('../models/Producto');

// Contenedor que agrega documentos de tipo producto a la base de datos pasada como parametro

class ContenedorMongoDB{

    constructor(mongoDBUrl){
        mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
        this.addElement({"name":'hola'})


    }

    async addElement(o){
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            const newProduct = new Product(o);
            await newProduct.save();
            return newProduct._id.toString()
        }
        catch(e){
            console.log('No se pudo grabar el objeto',e);
            return null
        }
    }


    
    async getById(id){
        const element = await Product.findById(id);
        return element;
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
        const elementos = await Product.find({})
        console.log(elementos)
        return elementos
    }
 
    deleteById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        // si no esta el id se reescribe la misma informacion
        Product.findByIdAndRemove(id,function(err, result){

            if(err){
                console.log('No se borro nada')
            }
            else{
                console.log('Se borro')
            }
        })

    }

    async deleteAll(){
        // si lo reescribo queda vacio
        await Product.remove()
        //esta funcion para eliminar completamente el archivo
        //await fs.promises.unlink(this.file)
    }
}

module.exports = ContenedorMongoDB;
