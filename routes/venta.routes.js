const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getVenta, crearVenta, actualizarVenta, eliminarVenta } = require('../controllers/venta.controller');

const router = Router();

router.get('/', getVenta);

router.post('/', [
        validarJWT,
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        check('totalCosto', 'El monto es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es requerida').not().isEmpty(),
        check('cliente', 'El id del cliente debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearVenta
);

router.put('/:id', [
        validarJWT,
        check('codigo', 'El codigo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').not().isEmpty(),
        check('totalCosto', 'El monto es obligatorio').not().isEmpty(),
        check('fecha', 'La fecha es requerida').not().isEmpty(),
        check('cliente', 'El id del cliente debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarVenta
);

router.delete('/:id', eliminarVenta);

module.exports = router;