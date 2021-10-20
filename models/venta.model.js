const { Schema, model } = require('mongoose');


const VentaSchema = Schema({
    codigo: {
        type: String,
        required: true,
        unique: true
    },
    cantidad: {
        type: Number,
        required: true,
    },
    totalCosto: {
        type: Number,
        required: true,
    },
    fecha: {
        type: String,
        require: true
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'Cliente',
        require: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        require: true
    },
});

VentaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});


module.exports = model('Venta', VentaSchema);