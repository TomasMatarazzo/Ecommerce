const DAOCarrito = require('../daos/DAOCarrito')
const Carrito = require('../daos/DAOCarritoFirestore.js');

class ApiCarrito{

    constructor(){
        this.dao = new DAOCarrito()
    }

    async createCarrito(userId){
        const carrito = {
          userId,
          timestamp: Date.now(),
          products: []
        }
        const id = await this.dao.addElement(carrito);
        return id
    }

    async addProductToCarrito(productId , carritoId){
        // Creamos objeto a agregar
        const producto = await Product.find({id:productId})
        const carrito = await db.getById(carritoId)
        const {name,description,price,category} = producto[0]
        newObject = {name,description,price,category}
        newObject = {...newObject, quantity:1 ,id: productId}
        let productos = carrito.products
    
        isRepeated = productos.find(item =>item.id == productId)
        if (!isRepeated){
          const product = new Product(newObject)
          productos.push(product)
        }
        else{
          console.log('no es repetido')
          productos = productos.map( (item)=> {
            newItem = {...newObject,quantity: ++item.quantity }
            newItem = new Product(newItem)
            return item.id == productId ? newItem: item})
          //user.cart = prueba
        }
      this.dao.updateById(carritoId,{products:productos})
    }

    async deleteProductFromProducto(productId, carritoId){
        const carrito = await this.dao.getById(carritoId)
        let products = carrito.products
        products = products.map( item => {
            newItem = {...item}
            newItem.quantity--
            newItem = new Product(newItem)
            return item.id === productId ? newItem: item
          })
        products = products.filter( (item) => item.quantity !== 0)
        await this.dao.updateById(carritoId,{products})
    }
    async getById(id){
        return this.dao.getById(id)
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

}

module.exports = ApiCarrito;
