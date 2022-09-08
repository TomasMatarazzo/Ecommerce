const mongoose = require('mongoose')
const Schema = mongoose.Schema

const OrdenSchema = new Schema(
    {
        cart:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ],
        nro:{
            type:String,
        },
        fecha:{
            type:String,
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