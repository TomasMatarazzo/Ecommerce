const DAOCarrito = require('../daos/DAOCarrito.js')
const Product = require('../models/Producto.js')

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
        const carrito = await this.getCarrito(carritoId)
        console.log(carrito)
        const {name,description,price,category} = producto[0]
        let newObject = {name,description,price,category}
        newObject = {...newObject, quantity:1 ,id: productId}
        let productos = carrito.products
    
        let isRepeated = productos.find(item =>item.id == productId)
        if (!isRepeated){
          const product = new Product(newObject)
          productos.push(product)
        }
        else{
          console.log('no es repetido')
          productos = productos.map( (item)=> {
            let newItem = {...newObject,quantity: ++item.quantity }
            newItem = new Product(newItem)
            return item.id == productId ? newItem: item})
          //user.cart = prueba
        }
      carrito.products = productos
      console.log(carrito.products)
      await carrito.save()
    }

    async deleteProductFromCarrito(productId, carritoId){
        const carrito = await this.dao.getById(carritoId)
        let products = carrito.products
        products = products.map( item => {
            let newItem = {...item}
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

    async getCarrito(userId){
        const carrito = await this.dao.getCarrito(userId)
        return carrito
    }



}

module.exports = ApiCarrito;
