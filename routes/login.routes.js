const {Router} = require('express');
const {check} = require('express-validator');
const { route } = require('express/lib/application');

const {login} = require('../controllers/login.controller');
const {validarCampos} = require('../middlewares/index');


const router = Router();

// router.post('/login',
// [
//  check('username','El usuario es obligatorio').not().isEmpty(),
//  check('password','La contraseña es obligatoria').not().isEmpty(),
//  validarCampos
// ],login);

router.get('/',( req,res ) =>{
    res.render('login/signin');
});

router.post('/login',login);

module.exports = router;






// router.get('/:id',showById);
// router.post('/',save);
// router.put('/:id',update);
// router.delete('/:id',drop);

// // router.get('/',showAll);
// router.get('/:id',[validarJWT,isAdminRole],showById);
// router.get('/add/:id',showAdd);
// router.post('/add',[
//     check('turn','El turno es oblogatorio').not().isEmpty(),
//     check('id_operator','El operador es oblogatorio').not().isEmpty(),
//     check('id_trk','La isla es oblogatoria').not().isEmpty(),
//     check('status','El estado es oblogatorio').not().isEmpty(),
//     validarCampos
// ],save);
// router.put('/:id',[
//     validarJWT,
//     isAdminRole,
//     check('turn','El turno es oblogatorio').not().isEmpty(),
//     check('id_operator','El operador es oblogatorio').not().isEmpty(),
//     check('id_trk','La isla es oblogatoria').not().isEmpty(),
//     check('status','El estado es oblogatorio').not().isEmpty(),
//     validarCampos],update);
// router.delete('/:id',[
//     validarJWT,
//     isAdminRole,
//     check('id','El identificador es oblogatorio').not().isEmpty(),
//     validarCampos],drop);

module.exports = router;