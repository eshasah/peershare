const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pass123$",
    database: "peershare",
    port: "3306",
    multipleStatements: true
});


module.exports = db;