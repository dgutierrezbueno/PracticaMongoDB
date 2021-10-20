const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const { getDetalleVenta, crearDetalleVenta, actualizarDetalleVenta, eliminarDetalleVenta } = require('../controllers/detalleVenta.controller')

const router = Router();

router.get('/', getDetalleVenta);

router.post('/', [
        validarJWT,
        check('codigoDetalle', 'El codigo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').isNumeric(),
        check('precioUnidad', 'El precio es obligatorio').isNumeric(),
        check('producto', 'El id del producto debe de ser válido').isMongoId(),
        check('venta', 'El id de venta debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearDetalleVenta
);

router.put('/:id', [
        validarJWT,
        check('codigoDetalle', 'El codigo es obligatorio').not().isEmpty(),
        check('cantidad', 'La cantidad es obligatoria').isNumeric(),
        check('precioUnidad', 'El precio es obligatorio').isNumeric(),
        check('producto', 'El id del producto debe de ser válido').isMongoId(),
        check('venta', 'El id de venta debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarDetalleVenta
);

router.delete('/:id', eliminarDetalleVenta);

module.exports = router;