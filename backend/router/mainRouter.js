const express = require("express");

const {
    login,
    logout,
} = require("../userController/login");

const {
    registerUser,
    getUser,
} = require("../userController/user");


router.route("/login").post(login).get(getUser);
router.route("/logout").get(logout);