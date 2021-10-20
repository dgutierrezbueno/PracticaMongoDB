/*
    Ruta: /api/clientes
*/

const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const { getClientes, crearCliente, actualizarCliente, eliminarCliente } = require('../controllers/clientes.controller')
const router = Router();

router.get('/', getClientes);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del cliente es obligatorio').not().isEmpty(),
        check('email', 'El email del cliente es obligatorio').isEmail(),
        check('telefono', 'El telefono del cliente es obligatorio').isNumeric(),
        validarCampos,
    ],
    crearCliente);
router.put('/:id', [
        validarJWT,
        check('nombre', 'El nombre del cliente es obligatorio').not().isEmpty(),
        check('apellido', 'El apellido del cliente es obligatorio').not().isEmpty(),
        check('email', 'El email del cliente es obligatorio').isEmail(),
        check('telefono', 'El telefono del cliente es obligatorio').isNumeric(),
        validarCampos,
    ],
    actualizarCliente);

router.delete('/:id', eliminarCliente);

module.exports = router;