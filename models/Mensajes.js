const mongoose = require('mongoose')
const Schema = mongoose.Schema


const MensajeSchema = new Schema({
    email:{ type: String},
    mensaje:{ type: String}

})

module.exports = mongoose.model('Mensaje',MensajeSchema);

    