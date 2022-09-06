const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
    {
        email:{
            type: String,
            required:true,
            unique:true,
        },
        password:{
            type:String,
            required:true
        },
        cart:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'Product'
            }
        ]
    }
)

UserSchema.set('toJSON',{
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
}
)

UserSchema.methods.comparePassword = async function (password){
    const user = this
    const compare = await bcrypt.compare(password, user.password)
    return compare
}

module.exports = mongoose.model('User',UserSchema);