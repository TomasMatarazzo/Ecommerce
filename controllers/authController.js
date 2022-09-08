const passport = require('passport')
const jwt = require('jsonwebtoken')

const log4js = require('log4js')
const logger = log4js.getLogger('error');

exports.login = async function(req,res,next){
    passport.authenticate('login', async(err,user,info) =>{
        try{
            if (err || !user){
                return res.json({message:"no body"}) 
            }

            req.login(user, {session:false}, async(err) =>{
                if (err) return next(err)
                const body = {_id: user._id , email: user.email}
                const token = jwt.sign({user:body}, 'top_secret')
                return res.json({token , user:user})
            })
        }
        catch(e){
            return next(e) 
        } 
    })(req,res,next)
}

exports.signup = async function(req,res,next){ 
    logger.info('Signup successfull')
    res.json({
        message: 'Signup successfull'
    })
}
