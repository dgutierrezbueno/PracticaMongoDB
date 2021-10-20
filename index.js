// clave mongodb:dxBvwveMTChSLbnC
// user:adminpractica


const express = require('express'); // importamos el node
require('dotenv').config();
const { dbConection } = require('./config/database');
const cors = require('cors');


//creamos servidor express
const app = express();

// configuracion CORS
app.use(cors());

//lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();
//console.log(process.env);


// Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/clientes', require('./routes/clientes.routes'));
app.use('/api/productos', require('./routes/productos.routes'));
app.use('/api/categorias', require('./routes/categoria.routes'));
app.use('/api/ventas', require('./routes/venta.routes'));
app.use('/api/detalleVentas', require('./routes/detalleVenta.routes'));

//app.use('/api/rol',require('./routes/rol.routes'));
//app.use('/api/compra',require('./routes/compra.routes'));


//para levantar el servidor 
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})