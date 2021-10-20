/*
    Productos
    ruta: '/api/productos'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    getProductos,
    crearProducto,
    actualizarProducto,
    eliminarProducto

} = require('../controllers/productos.controller')


const router = Router();

router.get('/', getProductos);

router.post('/', [
        validarJWT,
        check('codigo', 'El codigo del producto es necesario').not().isEmpty(),
        check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
        check('stock', 'El stock es necesario').not().isEmpty(),
        check('precio', 'El precio del producto es necesario').not().isEmpty(),
        check('categoria', 'El id del categoria debe de ser válido').isMongoId(),
        validarCampos
    ],
    crearProducto
);

router.put('/:id', [
        validarJWT,
        check('codigo', 'El codigo del producto es necesario').not().isEmpty(),
        check('nombre', 'El nombre del producto es necesario').not().isEmpty(),
        check('stock', 'El stock es necesario').not().isEmpty(),
        check('precio', 'El precio del producto es necesario').not().isEmpty(),
        check('categoria', 'El id del categoria debe de ser válido').isMongoId(),
        validarCampos
    ],
    actualizarProducto
);

router.delete('/:id',
    eliminarProducto
);

module.exports = router;