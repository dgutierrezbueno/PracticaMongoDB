const { response } = require("express");
const bcrypt = require('bcryptjs');
const Usuario = require ('../models/usuario.model');
const { generarJWT } = require('../helpers/jwt')

const login = async(req, res= response)=> {
     const { email, password } = req.body;
     
     try {
         // Verificar al usuario por su email
        const usuarioDB = await Usuario.findOne({ email });
      if ( !usuarioDB ) {
            return res.status(400).json({
                   ok: false,
                   msg: 'Email no encontrado'
                  //considerar la utilizacion de este mensaje
        });
    }
       // Verificar contraseña
       const validPassword = bcrypt.compareSync( password, usuarioDB.password );
       if ( !validPassword ) {
            return res.status(400).json({
              ok: false,
              msg: 'Contraseña no válida'
         });
      }

// Generar el TOKEN - JWT
const token = await generarJWT( usuarioDB.id );


res.json({
  ok: true,
token
})

} catch (error) {
    console.log(error);
    res.status(500).json({
          ok: false,
          msg: 'Hable con el administrador'
   })
}
}
module.exports = {
login
}