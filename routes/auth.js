const express = require('express')
const passport = require('passport')
const Router = express.Router()

const authController = require('../controllers/authController.js')

Router.get('/login' , authController.login)
Router.post('/signup' ,passport.authenticate('signup', {session:false}), authController.signup)
Router.get('/profile', passport.authenticate('jwt', {session: false}), 
    (req,res) =>{
        res.json({message:"Estas adentrooo"})
    }
)
module.exports = Router 
   