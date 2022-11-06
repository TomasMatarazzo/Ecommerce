const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdenSchema = new Schema(
    {
        cart:
            {
                type: Array,
            },
        nro:{
            type:Number,
        },
        fecha:{
            type:Number,
        },
        estado:{
            type:String,
        },
        email:{
            type:String,
        },
    }
)

module.exports = mongoose.model('orden',OrdenSchema);