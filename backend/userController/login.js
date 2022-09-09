const logger = require("../logger/logger");
const db = require("../database/dbConnector");
const SQL_USER = require("../database/SQLScripts/userSql");
const bcrypt = require("bcrypt");


let refreshTokens = [];

const login = (req, res) => {
    const username = req.body.username;
    const user = { name: username };

    //Validate credentials
    validateCredential(username, password);

    //Generate new token
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    refreshTokens.push(refreshToken);
    res.json({ accessToken: accessToken, refreshToken: refreshToken });
}

const validateCredential = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    logger.request.info("Validate credential: username=" + username);

    let auth_id;
    
    db.query(SQL_USER.GET_USER_DETAILS, username, (err, result) => {
    if (err) {
        sendError(res, "sql error: " + err.code);
        return;
    } else if (result.length > 0) {
        if (result[0].status == "Pending") {
            sendError(res, "status : ", "Contact Admin for approval");
            return;
        }

        bcrypt.compare(password, result[0].password, (error, response) => {
        if (response) {
            auth_id = result[0].auth_id[0];
            setSession(req, res, username, auth_id);
        } else {
            logger.response.error("Wrong username/password combination: username=" + username);
            res
            .status(404)
            .send({ err: "Wrong username/password combination!" });
        }
        });
    } else {
        logger.response.error("User doesnt exist: username=" + username);
        res.status(404).send({ err: "User doesn't exist" });
    }
    });
    
}

const setSession = (req, res, username, auth_id) => {
    req.session.user = {
        username: username,
        auth_id: auth_id,
    };
    res.send({
        username: username,
        auth_id: auth_id,
    });
};

const sendError = (res, log, code) => {
    logger.response.info(log + code);
    res.status(404).send({ err: code });
};

const logout = (req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token)
    res.sendStatus(204)
};

module.exports = {
    login,
    logout,
};