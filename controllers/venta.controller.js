const { response } = require('express');
const Venta = require('../models/venta.model');



const getVenta = async(req, res = response) => {

    const venta = await Venta.find()
        .populate('usuario', 'nombre email')
        .populate('cliente', 'nombre')

    res.json({
        ok: true,
        venta: venta
    });
}

const crearVenta = async(req, res = response) => {

    const uid = req.uid;
    const venta = new Venta({
        usuario: uid,
        ...req.body
    });

    try {
        const ventaDB = await venta.save();
        res.json({
            ok: true,
            venta: ventaDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede crear venta, consulte con el administrador'
        });
    }
}

const actualizarVenta = async(req, res = response) => {
    const id = req.params.id;
    const uid = req.uid;

    try {
        const venta = await Venta.findById(id);

        if (!venta) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrado por id',
            });
        }

        const cambiosVenta = {
            ...req.body,
            usuario: uid
        }

        const ventaActualizada = await Venta.findByIdAndUpdate(id, cambiosVenta, { new: true });
        res.json({
            ok: true,
            venta: ventaActualizada
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No se puede actualizar venta, consulte con el administrador'
        })
    }
}

const eliminarVenta = async(req, res = response) => {
    const id = req.params.id;
    try {

        const venta = await Venta.findById(id);

        if (!venta) {
            return res.status(404).json({
                ok: true,
                msg: 'Venta no encontrada por id',
            });
        }

        await Venta.findByIdAndDelete(id);

        res.json({
            ok: true,
            msg: 'Venta eliminada de la BD'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Venta no puede eliminarse, consulte con el administrador'
        });
    }

}

module.exports = {
    getVenta,
    crearVenta,
    actualizarVenta,
    eliminarVenta,
}