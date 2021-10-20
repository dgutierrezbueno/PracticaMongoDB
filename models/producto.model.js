const { Schema, model } = require('mongoose');

const ProductoSchema = Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true
    },
    decripcion: {
        type: String,
        
    },
    stock: {
        type: Number,
        required: true,
    },
    precio: {
        type: Number,
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
});


ProductoSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})



module.exports = model('Producto', ProductoSchema);