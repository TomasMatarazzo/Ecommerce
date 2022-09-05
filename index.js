const express = require('express');
require('./auth')
const app = express();

const PORT = 8080;

const productsRouter = require('./routes/products.js');
const carritosRouter = require('./routes/carrito.js');
const authRouter = require('./routes/auth.js')

const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
 
app.use('/api/products',productsRouter);
app.use('/api/carrito',carritosRouter);
app.use('/api/auth', authRouter);



app.get('/', (req, res) => {
    res.send('hola')
  })

  
app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}`)
})
