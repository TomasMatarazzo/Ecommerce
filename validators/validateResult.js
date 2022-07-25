// Funcion general que se encarga de revisar si hubo un error
// La llamamos al final de cada validacion de params.
// si hubo un error manda response si no ejecuta la siguiente funcion

const {validationResult} = require('express-validator')
const validateResult = (req,res,next) =>{
    try{ // uso la funcion de express validator que checkea si hubo un error
        validationResult(req).throw()
        console.log('no hubo error');
        next()
    }
    catch(error){ // error.array() devuelve los errores obtenidos.
        res.status(403)
        res.send({errors: error.array()}) 
    }
}

module.exports = {validateResult}