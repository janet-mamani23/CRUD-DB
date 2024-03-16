var express = require('express');

const listPersonas = (req, res, next) => { //funcion con 3 parametros req:solicitud al servidos,res:respuesta del servidor,next:pasa el control al siguiente
    const db = req.app.get("db");
    const query ="SELECT persona.id, persona.nombre, persona.email, oficina.denominacion FROM persona JOIN oficina WHERE persona.oficina_id LIKE oficina.id";
    db.query(query, function(err, rows) { //se ejecuta la consulta SQL, a su vez se ejecuta la funcion callback
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista de personas" }); 
    })//metodo de respuesta http al usuario, renderiza a la plantilla pasandole el titulo y la fila de datos.
    
};

const agregarPersona = function(req, res, next) {
    res.render('agregar', { title: "Agregar Persona" });
}

const postAgregarPersona = function(req, res, next) {
    const db = req.app.get("db");   //accede a la configuracion app para obtener conexion de la BD; "db" es la clave para identificar la conexion
    const nombre = req.body.nombre;
    const email = req.body.email;//se obtiene el valor ingresado de la nueva persona del cuerpo de la solicitud.
    const oficina_id = req.body.oficina_id;
    const query = "INSERT into persona (nombre, email, oficina_id) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, oficina_id], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personas");
    })
};

const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id; //se obtiene el valor del parametro id de la URL y lo asigna a la variable id, la ruta que utiliza esta funcion tiene un parametro llamado id, ej:'/edit/:id'
    db.query("SELECT * FROM persona WHERE id = ?", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit', { item: rows[0], title: "Editar Persona" });
    });
};

const postUpdatePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var nombre = req.body.nombre;
    var email = req.body.email;
    var oficina_id = req.body.oficina_id // Obtén la descripción del formulario
    db.query("UPDATE persona SET nombre=?, email=?, oficina_id =? WHERE id=?", [nombre, email,oficina_id, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
};

const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar Persona" });
    });
};

const postDeletePersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM persona WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/personas');
    });
};

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar Persona" });
};

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword; //extrae el valor del campo de entrada llamada keyword del formulario enviado al ser servidor y lo asigna a la variable keyword.
    const query = 'SELECT persona.nombre, persona.email, oficina.denominacion FROM persona JOIN oficina ON persona.oficina_id = oficina.id WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => { // ejecuta la consulta SQL en la base de datos utilizando el objeto de base de datos db, se pasa el valor de la variable keyword como un parámetro para la consulta utilizando ? como marcador de posición. El valor de keyword se envuelve entre % para buscar coincidencias parciales
        if (err) throw err;      //`%${keyword}%` representa un patrón de búsqueda que buscará cualquier cadena que contenga la palabra clave en cualquier parte de la cadena
        res.render('resultados', { personas: rows, title: "Resultados encontrados" })
    });
};

const listOficinas = (req, res, next) => {
    const db = req.app.get("db");
    const query ="SELECT * from oficina";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("oficinas", { oficinas: rows, title: "Lista de oficinas" });
    })
    //const query = "SELECT * from persona";
};
const agregarOficina = function(req, res, next) {
    res.render('agregarOficina', { title: "Agregar Oficina" });
};

const postAgregarOficina = function(req, res, next) {
    const db = req.app.get("db");
    const denominacion = req.body.denominacion;
    const query = "INSERT into oficina (denominacion) VALUES (?)";
    db.query(query, [denominacion], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/oficinas");
    })
};

const getEditarOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('editOficina', { item: rows[0], title: "Editar Oficina" });
    });
};

const postUpdateOficina= function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    var denominacion = req.body.denominacion;
     // Obtén la descripción del formulario
    db.query("UPDATE oficina SET denominacion=? WHERE id=?", [denominacion, id], function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
};

const getDeleteOficina = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrarOficina', { item: rows[0], title: "Borrar Oficina" });
    });
};

const postDeleteOficina= function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("DELETE FROM oficina WHERE id=?", id, function(err) {
        if (err) {
            console.error(err);
            return;
        }
        res.redirect('/oficinas');
    });
};

const buscarOficina = (req, res, next) => {
    res.render('busquedaO', { title: "Buscar Oficina" });
};

const buscarOficinaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword; //extrae el valor del campo de entrada llamada keyword del formulario enviado al ser servidor y lo asigna a la variable keyword.
    const query = 'SELECT oficina.denominacion FROM oficina  WHERE denominacion LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => { // ejecuta la consulta SQL en la base de datos utilizando el objeto de base de datos db, se pasa el valor de la variable keyword como un parámetro para la consulta utilizando ? como marcador de posición. El valor de keyword se envuelve entre % para buscar coincidencias parciales
        if (err) throw err;      //`%${keyword}%` representa un patrón de búsqueda que buscará cualquier cadena que contenga la palabra clave en cualquier parte de la cadena
        res.render('resultadosO', { oficinas: rows, title: "Resultados encontrados" })
    });
};


module.exports = {
    listPersonas,
    agregarPersona,
    postAgregarPersona,
    getEditarPersona,
    postUpdatePersona,
    getDeletePersona,
    postDeletePersona,
    buscarPersona,
    buscarPersonaResultados,
    listOficinas,
    agregarOficina,
    postAgregarOficina,
    getEditarOficina,
    postUpdateOficina,
    getDeleteOficina,
    postDeleteOficina,
    buscarOficina,
    buscarOficinaResultados
};
