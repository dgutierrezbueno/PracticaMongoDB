// clave mongodb:4j7B8BD34gOZj82i
// user:gutierrezDB


const express= require('express');// importamos el node
require('dotenv').config();
const {dbConection}= require('./config/database');
const cors=require('cors');


//creamos servidor express
const app=express();

//Configuraion de cors
app.use(cors());

//Conexion a la BD
dbConection();
//console.log(process.env);


// Rutas de la API
app.get('/',(req,res)=>{
    res.json({
        ok:true,
        msg:'Bienvenidos a node'
    });
});

//para levantar el servidor 
app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
})