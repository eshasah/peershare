const mysql = require("mysql");

const db = mysql.createConnection({
    user: "admin",
    host: "peershare.cpijuvcfcbvk.eu-central-1.rds.amazonaws.com",
    password: "peershare123",
    database: "carsharing",
    port: "3306",
    multipleStatements: true
});


module.exports = db;