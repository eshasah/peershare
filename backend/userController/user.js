const logger = require("../logger/logger");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQLScripts/userSql");
const bcrypt = require("bcrypt");
const jwtAuth = require("../userController/jwtAuth");

const getUser = (req, res) => {
    
}