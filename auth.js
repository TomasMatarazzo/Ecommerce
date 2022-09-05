// Middlewares para realizar la autenticacion

const passport = require('passport')
const localStrategy = require('passport-local').Strategy
const User = require('./models/User')

const JWTStrategy = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

// Registro de usuarios nuevos

passport.use('signup' , new localStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async(email, password, done) =>{
    try{
        console.log(email)
        const user = await User.create({email,password})
        return done(null, user)
    }catch(e){
        return done(e)
    }
}))


// Login de los usuarios
// verifico si el usuario se encuentra en la base de datos

passport.use('login' , new localStrategy({
    usernameField: 'email',
    passwordField:'password'
}, async(email, password, done) =>{
    try{
        const user = await User.findOne({email})
        if (!user)
            return done(null, false , {message:"Usuario no existente"}) // no se encontro el mail
         
        const validate = await user.comparePassword(password)

        if (!validate)
            return done(null, false , {message:"Contrasena incorrecta"}) 

        return done(null, user , {message:"Login exitoso"})
     
        
    }catch(e){
        return done(e)
    }
}))

passport.use( new JWTStrategy({
    secretOrKey: 'top_secret', //.env
    jwtFromRequest : ExtractJWT.fromUrlQueryParameter('secret_token')
}, async(token, done) =>{
    try{
        console.log('hola')
        return done(null, token.user)
    }catch(e){
        done(e)
    }
}))

