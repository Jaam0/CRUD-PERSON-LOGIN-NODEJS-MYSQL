const {Router} = require('express');
const {showAll,save} = require('../controllers/person.controller');
// const {validarCampos,validarJWT,isAdminRole,haveRole} = require('../middlewares/index');


const router = Router();

router.get('/',showAll);
router.post('/save',save);
// router.post('/save',(req,res)=>{
//     res.send(req.body);
// });





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