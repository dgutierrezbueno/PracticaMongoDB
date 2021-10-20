const { response } = require('express');

const Producto = require('../models/producto.model');

const getProductos = async(req, res = response) => {

    const productos = await Producto.find()
        .populate('categoria', 'nombre')
    res.json({
        ok: true,
        productos: productos
    });
}

const crearProducto = async(req, res = response) => {
    const { codigo, nombre } = req.body;
    try {
        const existeCodigo = await Producto.findOne({ codigo });
        if (existeCodigo) {
            return res.status(401).json({
                ok: false,
                msg: 'El codigo ya existe'
            });
        }
        const producto = new Producto(req.body);

        await producto.save();

        res.json({
            ok: true,
            producto
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }

}
const actualizarProducto = async(req, res = response) => {
    const prodId = req.params.id;

    try {
        const productoDB = await Producto.findById(prodId);

        if (!productoDB) {
            return res.status(401).json({
                ok: false,
                msg: 'No existe'
            });
        }

        const { codigo, ...campos } = req.body;
        if (productoDB.codigo !== codigo) {
            const existeCodigo = await Producto.findOne({ codigo });
            if (existeCodigo) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un producto con ese codigo'
                });
            }
        }
        campos.codigo = codigo;

        const productoActualizado = await Producto.findByIdAndUpdate(prodId, campos, { new: true });

        res.json({
            ok: true,
            producto: productoActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar producto'
        });
    }
}

const eliminarProducto = async(req, res = response) => {
    const id = req.params.id;
    try {

        const producto = await Producto.findById(id);

        if (!producto) {
            return res.status(401).json({
                ok: true,
                msg: 'Producto no encontrado por su id',
            });
        }

        await Producto.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Producto elimindo de la DB'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Producto no eliminado, consulte con el administrador'
        });
    }

}

module.exports = {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto
}