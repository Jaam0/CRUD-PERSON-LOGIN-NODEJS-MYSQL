const validarCampos = require('../middlewares/validator-fields');
const validarJWT = require('../middlewares/validator-jwt');
const isAdminRole= require('../middlewares/validator-role');

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...isAdminRole
};