const { Schema, model } = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        require: true,
        unique: true
    },
    estado: {
        type: Boolean,
        default: true
    }

});

CategoriaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.cateId = _id;
    return object;
});

module.exports = model('Categoria', CategoriaSchema);