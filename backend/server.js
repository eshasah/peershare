require('dotenv').config()

const express = require('express')
const cors = require("cors");
const router = require("./router/mainRouter");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const logger = require("./logger/logger");
const app = express();


app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// set & reset login cookies
app.use(cookieParser());

app.use(
    cors({
        origin: '*',
        methods: ["GET", "POST", "PUT"],
        credentials: true,
    })
)

//Adds session for each user login
app.use(
    session({
        key: "userId",
        secret: "subscribe",
        resave: false,
        saveUninitialized: false,
        cookie: {
        maxAge: 60 * 60 * 1000,
        },
    })
);

//Logging log4js
app.use(logger.express);

//All node server requests handled here.
app.use("/", router);


app.listen(3000, () => {
    console.log("running server");
});

