const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    userId:{type:String},
    timestamp:{ type: Date},
    products:{type:Array}

})

module.exports = mongoose.model('Carrito',ProductSchema);