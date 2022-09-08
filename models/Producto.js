const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductSchema = new Schema({
    timestamp:{ type: Date},
    name: {type: String} 
    ,description:{ type:String}
    ,code:{ type : String}
    ,image:{ type: String}
    ,price :{ type: Number}
    ,stock :{ type: Number}
    ,quantity:{type: Number},
    id:{type: String}

})

module.exports = mongoose.model('Product',ProductSchema);

