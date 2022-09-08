// Funcion general que se encarga de revisar si hubo un error
// La llamamos al final de cada validacion de params.
// si hubo un error manda response si no ejecuta la siguiente funcion

const log4js = require('log4js')
const logger = log4js.getLogger('error');

const {validationResult} = require('express-validator')
const validateResult = (req,res,next) =>{
    try{ // uso la funcion de express validator que checkea si hubo un error
        console.log(req.body)
        validationResult(req).throw()
        next()
    }
    catch(error){ // error.array() devuelve los errores obtenidos.
        logger.error('Error a la hora de la validacion')
        res.status(403)
        res.send({errors: error.array()}) 
    }
}

module.exports = {validateResult} 