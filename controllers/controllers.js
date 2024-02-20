var express = require('express');

const listPersonas = (req, res, next) => {
    const db = req.app.get("db");
    const query ="SELECT persona.nombre, persona.email, oficina.denominacion FROM persona JOIN oficina ON persona.oficina_id = oficina.id";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("personas", { personas: rows, title: "Lista" });
    })
    //const query = "SELECT * from persona";
}

const agregarPersona = function(req, res, next) {
    res.render('agregar', { title: "Agregar" });
}

const postAgregarPersona = function(req, res, next) {
    const db = req.app.get("db");
    const nombre = req.body.nombre;
    const email = req.body.email;
    const oficina_id = req.body.oficina_id;
    const query = "INSERT into persona (nombre, email, oficina_id) VALUES (?, ?, ?)";
    db.query(query, [nombre, email, oficina_id], function(err) {
        if (err) {
            console.log(err);
            return;
        }
        res.redirect("/personas");
    })
}

const getEditarPersona = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('edit', { item: rows[0], title: "Editar" });
    });
}

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
}

const getDeletePersona = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM persona WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrar', { item: rows[0], title: "Borrar" });
    });
}

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
}

const buscarPersona = (req, res, next) => {
    res.render('busqueda', { title: "Buscar Persona" });
}

const buscarPersonaResultados = (req, res, next) => {
    const db = req.app.get("db");
    const keyword = req.body.keyword;
    const query = 'SELECT persona.nombre, persona.email, oficina.denominacion FROM persona JOIN oficina ON persona.oficina_id = oficina.id WHERE nombre LIKE ?';
    db.query(query, [`%${keyword}%`], (err, rows) => {
        if (err) throw err;
        res.render('resultados', { personas: rows, title: "Resultados encontrados" })
    });
}

const listOficinas = (req, res, next) => {
    const db = req.app.get("db");
    const query ="SELECT * from oficina";
    db.query(query, function(err, rows) {
        if (err) {
            console.log(err);
            return;
        }
        res.render("oficinas", { oficinas: rows, title: "Lista" });
    })
    //const query = "SELECT * from persona";
}
const agregarOficina = function(req, res, next) {
    res.render('agregarOficina', { title: "Agregar" });
}

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
}

const getEditarOficina = function(req, res, next) {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=(?)", [id], function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('editOficina', { item: rows[0], title: "Editar" });
    });
}

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
}

const getDeleteOficina = (req, res, next) => {
    var db = req.app.get('db');
    var id = req.params.id;
    db.query("SELECT * FROM oficina WHERE id=?", id, function(err, rows) {
        if (err) {
            console.error(err);
            return;
        }
        res.render('borrarOficina', { item: rows[0], title: "Borrar" });
    });
}

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
}


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
    postDeleteOficina
};
