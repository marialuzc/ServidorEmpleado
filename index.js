const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());  
app.use(express.json());


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "dbempleados"
});

// Guardar

app.post("/create", (req, res)=>{
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const annos = req.body.annos;

    db.query('INSERT INTO empleados(nombre,edad,pais,cargo,annos) VALUES (?,?,?,?,?)',[nombre,edad,pais,cargo,annos],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});


//LISTAR
app.get("/empleados", (req, res)=>{
    

    db.query('SELECT * FROM empleados',
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// ACTUALIZAR

app.put("/actualizarEmpleado", (req, res)=>{
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const annos = req.body.annos;

    db.query('UPDATE empleados set nombre=?,edad=?,pais=?,cargo=?,annos=? WHERE id=?',[nombre,edad,pais,cargo,annos,id],
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

// Borrar

app.delete("/borrarEmpleado/:id", (req, res)=>{
    
    const id = req.params.id;

    db.query('DELETE FROM empleados WHERE id=?',id,
    (err, result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001, ()=>{
    console.log("Corriendo en el puerto 3001");
})
