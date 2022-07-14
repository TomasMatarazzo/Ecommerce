var admin = require("firebase-admin");
var serviceAccount = require("../ecommerce-be1d1-firebase-adminsdk-gyi0f-9019de578c.json");

// Contenedor que agrega documentos de tipo producto a la base de datos pasada como parametro

class ContenedorFirebase{

    constructor(){

        admin.initializeApp({
          credential: admin.credential.cert(serviceAccount)
        });

        this.db = admin.firestore()
        this.collection = this.db.collection('carritos');
    }

    async addElement(o){
        // tengo en cuenta el caso de que es el primer elemento del archivo
        try{
            await this.collection.add(o);
            console.log('se creo')
        }
        catch(e){
            console.log(e)
        }
    }


    
    async getById(id){
        try{
            const doc = await this.collection.doc(id).get()
            return {id,...doc.data()}
        }
        catch(e){
            console.log(e)
            return 
        }
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
            console.log(e)
        }
    }

    async deleteAll(){
        const elem = await this.collection.get()
        elem.forEach((doc)=>{
            doc.ref.delete()
        })

    }
}

module.exports = ContenedorFirebase;
