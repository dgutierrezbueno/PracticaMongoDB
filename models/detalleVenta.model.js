const { Schema, model } = require('mongoose');

const detalleVentaSchema = Schema({
    codigoDetalle: {
        type: String,
        require: true,
        unique: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    precioUnidad: {
        type: Number,
        require: true
    },
    producto: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: true
    },
    venta: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
        required: true
    },

}, { collection: 'DetalleVentas' });

detalleVentaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    return object;
});

module.exports = model('DetalleVenta', detalleVentaSchema);