const express = require('express')
const passport = require('passport')
const Router = express.Router()
const User = require('../models/User')
const authController = require('../controllers/authController.js')

Router.get('/login' , authController.login)
Router.post('/signup' ,passport.authenticate('signup', {session:false}), authController.signup)
Router.get('/profile', passport.authenticate('jwt', {session: false}), 
    (req,res) =>{
        res.json({message:"Estas adentrooo"})
    }
)

Router.get('/usuarios', async (request, response) => {
    const users = await User.find({}).populate('cart')
    response.json(users)
  })
module.exports = Router 
   