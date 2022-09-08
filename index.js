const express = require('express');
require('dotenv').config()
require('./auth')

const cors = require('cors')


const app = express();
const PORT = 8080;

const log4js = require('log4js')
const logConfig = require('./config/logger')
log4js.configure(logConfig)
const logger = log4js.getLogger('');

const productsRouter = require('./routes/products.js');
const carritosRouter = require('./routes/carrito.js');
const authRouter = require('./routes/auth.js')
const ordenesRouter = require('./routes/ordenes')


const bp = require('body-parser')
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
 
app.use('/api/products',productsRouter);
app.use('/api/carrito',carritosRouter);
app.use('/api/auth', authRouter);
app.use('/api/ordenes', ordenesRouter);

 


app.get('/', (req, res) => {
    res.send('hola')
  })

  
app.listen(PORT, () => {
    logger.info('Arranco el servidor en el puerto ' + PORT)
})
