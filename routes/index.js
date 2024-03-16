var express = require('express'); //importa el modulo express y lo asigna a la variable express
var router = express.Router(); //crea un nuevo objeto Router de Express (http) y lo asigna a la variable router. El enrutador se utiliza para definir rutas en la aplicación. Con él, puedes manejar diferentes solicitudes HTTP (GET, POST, PUT, DELETE, etc.) a diferentes rutas de la aplicación.
const controllers = require('../controllers/controllers');

/* GET home page. */
router.get('/', function(req, res, next) { //define una ruta GET para la ruta raíz ('/') de la aplicación. Cuando un cliente realiza una solicitud GET a la ruta raíz, Express ejecutará la función de controlador proporcionada como segundo argumento
  res.render('index', { title: 'Express' }); // Dentro de la función de controlador, se utiliza res.render() para renderizar una plantilla llamada 'index'
});

router.get('/personas', controllers.listPersonas);  
router.get('/agregar', controllers.agregarPersona);
router.post("/agregar", controllers.postAgregarPersona);
router.get('/edit/:id', controllers.getEditarPersona); //el :id es un parametro de ruta q indica que puede haber un identificador unico.
router.post('/update/:id', controllers.postUpdatePersona);
router.get('/delete/:id', controllers.getDeletePersona);
router.post('/delete/:id', controllers.postDeletePersona);
router.get('/buscar', controllers.buscarPersona);
router.post('/resultados', controllers.buscarPersonaResultados);
router.get('/oficinas', controllers.listOficinas); //cuando se accede a esta ruta se invoca al controlador listOficinas del objeto controllers.
router.get('/agregarOficina', controllers.agregarOficina);
router.post("/agregarOficina", controllers.postAgregarOficina);
router.get('/editOficina/:id', controllers.getEditarOficina);
router.post('/updateOficina/:id', controllers.postUpdateOficina);
router.get('/deleteOficina/:id', controllers.getDeleteOficina);
router.post('/deleteOficina/:id', controllers.postDeleteOficina);
router.get('/buscarO', controllers.buscarOficina);
router.post('/resultadosO', controllers.buscarOficinaResultados);


module.exports = router;
