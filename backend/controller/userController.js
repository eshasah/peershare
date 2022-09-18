const jwt       = require('jsonwebtoken');
const UserDAO   = require('../model/UserDAO');
const CarDAO    = require('../model/CarDAO');
const Validator = require('../utilities/Validator');

var UserController = module.exports = {

    register: async (req, res) => {

        // Validate form data inputs
        const { errors, data } = await Validator.validate(req.body, { email: 'unique' });
        
        if (errors.length > 0) {
            res.status(400).json({ errors });
        } else {
            await UserDAO.addUser(data);

            // Login
            UserController.login(req, res);
        }
        
    },

    login: async (req, res) => {

        // Validate form data input
        let { errors, data } = await Validator.validate(req.body, { email: 'exists', password: 'verify' });

        // Check if validation passed
        if (errors.length > 0) {
            res.status(400).json({ errors })
        } else {
            console.log(data.email_id);
            const user = await UserDAO.getUserByEmail(data.email_id);

            // Generate user token
            const token = jwt.sign(
                {
                    id : user.user_id.toString(),
                    email : user.email_id,
                    eth_account : user.eth_account
                },
                process.env.JWT_SECRET_KEY,
                {
                    expiresIn: '7 days'
                }
            );

            // Add token into data
            data.token = token;

            // Update user database
            await UserDAO.updateUser(data, user.user_id);

            // Set token in cookie
            res.cookie('lg_token', token, { httpOnly: true });

            res.status(200).json(
                {
                    data: {
                        loggedin: true
                    }
                }
            );

        }
    },

    isLoggedin: async(req, res) => {
        res.status(200).json(
            {
                data: {
                    isLoggedin: true
                }
            }
        );
    },

    getCars: async (req, res) => {
        
        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const cars = await CarDAO.getCarsByUserId(T.user_id);

        res.status(200).json({ data: cars });
    },

    getUser: async (req, res) => {

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        const user = await UserDAO.getUserById(T.user_id);

        if (Object.keys(user).length > 0) {
            res.status(200).json({
                data: {
                    user_id          : user.user_id,
                    f_name  : user.f_name,
                    l_name   : user.l_name,
                    email_id       : user.email_id,
                    eth_account : user.eth_account,
                    user_type: user.user_type
                }
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }

    }
}