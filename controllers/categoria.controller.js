const { response, json } = require('express');

const Categoria = require('../models/categoria.model');

const getCategoria = async(req, res) => {
    const categorias = await Categoria.find();
    res.json({
        ok: true,
        categorias
    });
}
const crearCategoria = async(req, res = response) => {
    const { nombre, estado } = req.body;
    try {
        const existeCategoria = await Categoria.findOne({ nombre });
        if (existeCategoria) {
            return res.status(401).json({
                ok: false,
                msg: 'La categoria ya ha sido registrada'
            });
        }

        const categoria = new Categoria(req.body);

        await categoria.save();
        res.json({
            ok: true,
            categoria
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error en el servidor'
        });
    }
}

const actualizarCategoria = async(req, res = response) => {
    const id = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(id);
        if (!categoriaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }

        const { nombre, ...campos } = req.body;
        if (categoriaDB.nombre !== nombre) {
            const existeNombre = await Categoria.findOne({ nombre });
            if (existeNombre) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe una categoria con ese nombre'
                });
            }

        }
        campos.nombre = nombre;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(id, campos, { new: true });
        res.json({
            ok: true,
            categoria: categoriaActualizada
        });
    } catch (error) {
        console.log(error);
        res.status(500), json({
            ok: false,
            msg: 'Error al actualizar categoria'
        });
    }
}

const eliminarCategoria = async(req, res = response) => {
    const id = req.params.id;
    try {
        const categoriaDB = await Categoria.findById(id);
        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                msg: 'No existe una categoria con ese id'
            });
        }
        await Categoria.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Categoria eliminada de la BD'
        });
    } catch (error) {
        console.log(error);
        res.status(500), json({
            ok: false,
            msg: 'No es posible eliminar la categoria'
        });
    }
}
module.exports = {
    getCategoria,
    crearCategoria,
    actualizarCategoria,
    eliminarCategoria
}