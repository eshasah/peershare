const logger = require("../logger/logger");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQLScripts/userSql");
const bcrypt = require("bcrypt");
const jwtAuth = require("../userController/jwtAuth");




const login = (req, res) => {
    console.log(req.body.username);

    const username = req.body.username;
    //const password = req.body.password;
    const user = { name: req.body.username };

    //Validate credentials
    user = validateCredential(req, res);

    //Generate new token
    const accessToken = jwtAuth.generateAccessToken(user);
    const refreshToken = jwtAuth.generateRefreshToken(user);
    jwtAuth.pushToken(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken, username: username});
}

const validateCredential = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    logger.request.info("Validate credential: username=" + username);

    if(password == null){
        sendError(res, "password is null");
    }

    //let auth_id;
    
    // db.query(SQL_USER.GET_USER_DETAILS, username, (err, result) => {
    // if (err) {
    //     sendError(res, "sql error: " + err.code);
    //     return;
    // } else if (result.length > 0) {
    //     if (result[0].status == "Pending") {
    //         sendError(res, "status : ", "Contact Admin for approval");
    //         return;
    //     }

    //     bcrypt.compare(password, result[0].password, (error, response) => {
    //     if (response) {
    //         auth_id = result[0].auth_id[0];
            //setSession(req, res, username);
    //     } else {
    //         logger.response.error("Wrong username/password combination: username=" + username);
    //         res
    //         .status(404)
    //         .send({ err: "Wrong username/password combination!" });
    //     }
    //     });
    // } else {
    //     logger.response.error("User doesnt exist: username=" + username);
    //     res.status(404).send({ err: "User doesn't exist" });
    // }
    // });
    
}

const setSession = (req, res, username) => {
    req.session.user = {
        username: username,
    };
    res.send({
        username: username,
    });
};

const sendError = (res, log, code) => {
    logger.response.info(log + code);
    res.status(404).send({ err: code });
};

const logout = (req, res) => {
    jwtAuth.removeToken(req);
    res.sendStatus(204);
};

module.exports = {
    login,
    logout,
};