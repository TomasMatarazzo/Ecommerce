const { param } = require('express-validator');
const { validateResult } = require('./validateResult');

const validateCarritoId = [
    param('id')
    .isString(),
    (req,res,next) => {validateResult(req,res,next)}

]

module.exports = validateCarritoId