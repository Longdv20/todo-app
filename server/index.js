const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const mysql = require('mysql');

const db = mysql.createPool({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "testdb",
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/app/get', (req, res) =>{
    const sqlSelect = "SELECT * FROM todo_list";
    db.query(sqlSelect, (err, result) => {
        console.log(result);
    })
})

app.post("/api/insert", (req, res) => {

    const action = req.body.action
    const description = req.body.description

    const sqlInsert = "INSERT INTO todo_list (action, description) VALUES (?,?)"
    db.query(sqlInsert, [action, description],  (err, result) => {

    })
})

app.delete("/api/delete/:action", (req, res) => {
    const name = req.params.action;
    const sqlDelete = "DELETE FROM todo_list WHERE action= ?";

    db.query(sqlDelete, name, (err, result) => {
        if (err) console.log(err);
    })
})

app.put("api/update", (req, res) => {
    const name = req.params.action;
    const description = req.body.description;
    const sqlUpdate = "UPDATE SET todo_list description = ? WHERE action =?";
})

app.listen(3001, () =>{
    console.log("running on port 3001")
});