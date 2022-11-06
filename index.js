const express = require('express');
console.log(process.env.NODE_ENV)
const path = require('path')
require('dotenv').config({ path:path.resolve(__dirname, './.env.' + process.env.NODE_ENV  ) })
require('./auth') 
const cors = require('cors')
const app = express(); 
const server = require('http').createServer(app)

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

server.listen(process.env.PORT || 8000, () => {
  logger.info('Arranco el servidor en el puerto ')
})


// CHAT CON SOCKETS

const io = require('socket.io')(server, {cors:{origin:'http://localhost:3000'}})
const ApiMensajes = require('./negocio/apiMensajes')
const apiMensajes = new ApiMensajes()

io.on('connection', async (socket)=>{
  let mensajes = await apiMensajes.obtenerMensajes()

  socket.on('agregar', async (data)=>{
    apiMensajes.agregarMensaje(data.email, data.mensaje)
    let mensajes = await apiMensajes.obtenerMensajes()
    socket.emit('chat', mensajes)
  })
})

