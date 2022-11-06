const { param , body} = require('express-validator');
const { validateResult } = require('./validateResult');

const validateProductId = [
    param('idProduct')
    .isDecimal(),
    (req,res,next) => {validateResult(req,res,next)}

]

const validateProductBody = [ 
    body('name')
        .exists(),
    body('description')
        .exists(),
    body('code')
        .optional(),
    body('url')
        .optional(),
    body('price')
        .optional()
        .isNumeric(),
    body('stock')
        .optional()
        .isNumeric(),
    body('id')
        .isNumeric(),
    body('category')
        .isNumeric(),
    (req,res,next) =>{ validateResult(req,res,next)}

]

module.exports = {validateProductId , validateProductBody}