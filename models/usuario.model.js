const {Schema, model}= require('mongoose');


//Definicion del esquema para la coleccion de usuario


const UsuarioSchema=Schema({
    nombre:{
        type: String,
        required:true
    },
    apellido:{
        type: String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        require:true,
        default: 'USER_ROLE'
    },
    google:{
        type:Boolean,
        default:false
    },
  
});

//Este cambio es solo, la bd permanece con _id
UsuarioSchema.method('toJSON', function(){
    const {__v, _id, password, ...Object}=this.toObject();
    Object.uid=_id;
    return Object;
});

//se exporta el modelo 
// Por defecto moongose crean  en mongodb un documento en plural:usuarios
module.exports= model ('Usuario', UsuarioSchema)