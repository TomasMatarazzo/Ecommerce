const mongoose = require('mongoose');
// Contenedor que agrega documentos de tipo producto a la base de datos pasada como parametro
class DAOMongoDB{ 

    constructor(mongoDBUrl ,modelo){
        mongoose.connect(mongoDBUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        var db = mongoose.connection;
        this.modelo = modelo;
        db.on('error', console.error.bind(console, 'MongoDB connection error:'));
 
    }

    async addElement(o){
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            const newProduct = new this.modelo(o)
            //const newProduct = new Product(o);
            await newProduct.save();
            console.log(o)
            console.log('el nuevo producto es')
            console.log(newProduct)
            return newProduct._id.toString()

        }
        catch(e){
            return null
        }
    }
    
    async getById(id){
        const element = await this.modelo.findById(id);
        return element;
    }

   updateById(id , product){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        this.modelo.findByIdAndUpdate(id,product, function(err, result){
        })
    }

    async getAll(){
        const elementos = await this.modelo.find({})
        console.log('los elementos son')
        console.log(elementos)
        return elementos
    }
 
    deleteById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        // si no esta el id se reescribe la misma informacion
        this.modelo.findByIdAndRemove(id,function(err, result){

        })

    }

    async deleteAll(){
        // si lo reescribo queda vacio
        await this.modelo.remove()
        //esta funcion para eliminar completamente el archivo
        //await fs.promises.unlink(this.file)
    }
}

module.exports = DAOMongoDB;
