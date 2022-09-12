// Set up environment
const dotenv       = require('dotenv');
dotenv.config();

// Connect Database
const mysql        = require('mysql2/promise');

global.DB = mysql.createPool(
    {
        host               : process.env.DB_HOST,
        user               : process.env.DB_USER,
        database           : process.env.DB_NAME,
        waitForConnections : process.env.DB_WAIT_FOR_CONNECTIONS,
        connectionLimit    : process.env.DB_CONNECTION_LIMIT,
        queueLimit         : process.env.DB_QUEUE_LIMIT
    }
);

// Set up express framework
const express      = require('express');
const bodyParser   = require('body-parser');
const helmet       = require('helmet');
const cookieparser = require('cookie-parser');
const cors         = require('cors');

const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieparser());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));

// Listen
app.listen(process.env.PORT);

// Get router
const usersRouter = require('./router/userRouter');
const carsRouter = require('./router/carRouter')

app.use('/users', usersRouter);
app.use('/cars', carsRouter);