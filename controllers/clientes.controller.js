const { response } = require('express');

const Cliente = require('../models/cliente.model');


const getClientes = async(req, res = response) => {
    const clientes = await Cliente.find({}, 'nombre telefono email');
    res.json({
        ok: true,
        clientes
    });
}

const crearCliente = async(req, res = response) => {
    const { email } = req.body;
    try {
        const existeEmail = await Cliente.findOne({ email });
        if (existeEmail) {
            return res.status(401).json({
                ok: false,
                msg: 'El email ya a sido registrado'
            });
        }
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.json({
            ok: true,
            cliente
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor, revisar logs'
        });
    }
}

const actualizarCliente = async(req, res = response) => {
    const id = req.params.id;
    try {
        const clienteDB = await Cliente.findById(id);
        if (!clienteDB) {
            return res.status(401).json({
                ok: false,
                msg: 'No existe un cliente con ese id'
            });
        }

        const { email, ...campos } = req.body;
        if (clienteDB.email !== email) {
            const existeEmail = await Cliente.findOne({ email });
            if (existeEmail) {
                return res.status(401).json({
                    ok: false,
                    msg: 'Ya existe un cliente con este email'
                });
            }
        }
        campos.email = email;
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            cliente: clienteActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al actualizar cliente'
        });
    }

}

const eliminarCliente = async(req, res = response) => {
    const id = req.params.id;
    try {
        const clienteDB = await Cliente.findById(id);
        if (!clienteDB) {
            return res.status(404).json({
                ok: false,
                mensaje: 'No existe un cliente con ese id'
            });
        }
        await Cliente.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Cliente eliminado de la bd'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'No es posible eliminar cliente'
        });
    }
}

module.exports = {
    getClientes,
    crearCliente,
    actualizarCliente,
    eliminarCliente
}