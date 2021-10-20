const { response } = require('express');

const DetalleVenta = require('../models/detalleVenta.model');

const getDetalleVenta = async(req, res = response) => {

    const detalleVenta = await DetalleVenta.find()
        .populate('producto', 'nombre precio')
        .populate('venta', 'cantidad fecha')

    res.json({
        ok: true,
        detalleVenta: detalleVenta
    });
}

const crearDetalleVenta = async(req, res = response) => {
    const { codigoDetalle } = req.body;
    try {
        const existeCodigoDetalle = await DetalleVenta.findOne({ codigoDetalle });
        if (existeCodigoDetalle) {
            return res.status(400).json({
                ok: false,
                msg: 'El codigo de detalle de venta ya ha sido reguistrado'
            });
        }
        const detalleVenta = new DetalleVenta(req.body);

        await detalleVenta.save();

        res.json({
            ok: true,
            detalleVenta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }

}

const actualizarDetalleVenta = async(req, res = response) => {
    const id = req.params.id;

    try {
        const detalleVentaDB = await DetalleVenta.findById(id);

        if (!detalleVentaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un detalle de venta con ese id'
            });
        }

        const { codigoDetalle, ...campos } = req.body;
        if (detalleVentaDB.codigoDetalle !== codigoDetalle) {
            const existeCodigoDetalle = await DetalleVenta.findOne({ codigoDetalle });
            if (existeCodigoDetalle) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un detalle de venta con ese codigo'
                });
            }
        }
        campos.codigoDetalle = codigoDetalle;
        const detalleVentaActualizada = await DetalleVenta.findByIdAndUpdate(id, campos, { new: true });

        res.json({
            ok: true,
            detalleVenta: detalleVentaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar detalle de venta'
        });
    }
}

const eliminarDetalleVenta = async(req, res = response) => {
    const id = req.params.id;
    try {

        const detalleVenta = await DetalleVenta.findById(id);

        if (!detalleVenta) {
            return res.status(404).json({
                ok: true,
                msg: 'Detalle de venta no encontrado por su id',
            });
        }

        await DetalleVenta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Detalle de venta eliminado de la DB'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Detalle de venta no eliminado, consulte con el administrador'
        });
    }

}
module.exports = {
    getDetalleVenta,
    crearDetalleVenta,
    actualizarDetalleVenta,
    eliminarDetalleVenta,
}