var express = require('express');
var router = express.Router();
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/personas', controllers.listPersonas);
router.get('/agregar', controllers.agregarPersona);
router.post("/agregar", controllers.postAgregarPersona);
router.get('/edit/:id', controllers.getEditarPersona);
router.post('/update/:id', controllers.postUpdatePersona);
router.get('/delete/:id', controllers.getDeletePersona);
router.post('/delete/:id', controllers.postDeletePersona);
router.get('/buscar', controllers.buscarPersona);
router.post('/resultados', controllers.buscarPersonaResultados);
router.get('/oficinas', controllers.listOficinas);
router.get('/agregarOficina', controllers.agregarOficina);
router.post("/agregarOficina", controllers.postAgregarOficina);
router.get('/editOficina/:id', controllers.getEditarOficina);
router.post('/updateOficina/:id', controllers.postUpdateOficina);
router.get('/deleteOficina/:id', controllers.getDeleteOficina);
router.post('/deleteOficina/:id', controllers.postDeleteOficina);


module.exports = router;
