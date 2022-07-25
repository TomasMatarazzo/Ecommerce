var admin = require("firebase-admin");
// Contenedor que agrega documentos de tipo producto a la base de datos pasada como parametro

class ContenedorFirebase{

    constructor(ServiceAccount){

        admin.initializeApp({
          credential: admin.credential.cert(ServiceAccount)
        });

        this.db = admin.firestore()
        this.collection = this.db.collection('carritos');
    }

    async addElement(o){
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            await this.collection.add(o);
        }
        catch(e){
            throw new Error()
        }
    }

    
    async getById(id){
            const doc = await this.collection.doc(id).get()
            if (doc.data() == undefined){
                throw new Error()
            }
            return {id,...doc.data()}

    }

   async updateById(id , o){
        try{
            await this.collection.doc(id).update(o)
        }
        catch(e){
            console.log(e)
        }
    }

    async getAll(){
        const elementosDefault = await this.collection.get()
        let elementos = []
        elementosDefault.forEach(doc => {
                elementos.push({
                    id: doc.id,
                    timestamp: doc.data().timestamp,
                    products: doc.data().products
                });
          });
          console.log(elementos)
        return elementos
    }
 
    async deleteById(id){
        // busco elemento a eliminar y vuelvo a reescribir el archivo.
        // si no esta el id se reescribe la misma informacion
        try{
            await this.collection.doc(id).delete()
        }
        catch(e){
            throw new Error()
        }
    }

    async deleteAll(){
        try{
            const elem = await this.collection.get()
            elem.forEach((doc)=>{
                doc.ref.delete()
            })
        }
        catch(e){
            throw new Error()
        }

    }
}

module.exports = ContenedorFirebase;
