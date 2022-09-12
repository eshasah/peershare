const express = require("express");
const router = express.Router();

const {
    login,
    logout,
} = require("../userController/login");

// const {
//     registerUser,
//     getUser,
// } = require("../userController/login");


router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;