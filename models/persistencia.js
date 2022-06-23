const fs = require('fs');

class Persistencia{

    constructor(fileName){
        this.file = fileName;
    }

    async addElement(o){
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            let objects = await this.getAll();
            let newId;
            if (objects == null){
                newId = 0;
                objects = []
            }
            else{
                newId = objects.at(-1).id;
            }
            o.id = ++newId;
            objects.push(o);
            await fs.promises.writeFile(this.file,JSON.stringify(objects));
            console.log(`Se grabo el objeto con el id ${o.id}\n`)
            return o.id;
        }
        catch(e){
            console.log('No se pudo grabar el objeto',e);
            return null
        }
    }


    
    async getById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
            const objects = await this.getAll();
            const object = objects.filter( (o) => o.id == id)
            return object[0]?object[0]:null;
    }

    async updateById(id , product){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
            console.log(product)
            await this.deleteById(id);
            const newObjects = await this.getAll();
            product.id = id;// le agrego el id anterior al nuevo producto
            newObjects.push(product);
            await fs.promises.writeFile(this.file,JSON.stringify(newObjects));
    }

    async getAll(){
        try{
            const fileData = await fs.promises.readFile(this.file,'utf8')
            return (fileData == " ")?null:JSON.parse(fileData)

        }
        catch(e){
            console.log('Error a la hora de abrir el archivo' , e)
        }
    }

    async deleteById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        // si no esta el id se reescribe la misma informacion
        try{
            const objects = await this.getAll();
            const newObjects = objects.filter( (o) => o.id != id)
            await fs.promises.writeFile(this.file,JSON.stringify(newObjects));
        }
        catch(e){
            console.log('Error a la hora de eliminar por id',e)
        }
    }

    async deleteAll(){
        // si lo reescribo queda vacio
        try{
            await fs.promises.writeFile(this.file,' ')
        }
        catch(e){
            console.log('No se pudo eliminar los objectos del archivo',e)
        }
        //esta funcion para eliminar completamente el archivo
        //await fs.promises.unlink(this.file)
    }
}

module.exports = Persistencia;
