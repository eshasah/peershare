const passwordHash = require('password-hash');
const UserDAO      = require('../model/UserDAO');
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');
const PeerContract = require('../blockchain/scripts/PeerContract');
const crypto    = require('crypto');

async function validate (formData, rules) {
    // Parse json
    formObj = JSON.parse(JSON.stringify(formData));

    // To store errors.
    let errors = [];
    console.log(errors);
    // To store data
    data = {};

    // Validate first name
    if (formObj.hasOwnProperty('first_name')) {
        data.f_name = formObj.first_name.toLowerCase();
        if (/^[a-zA-Z]+$/.test(formObj.first_name) === false) {
            errors.push({ message: 'Invalid First Name.', field: 'first_name' });
        }
    }
    // Validate last name
    if (formObj.hasOwnProperty('last_name')) {
        data.l_name = formObj.last_name.toLowerCase();
        if (/^[a-zA-Z]+$/.test(formObj.last_name) === false) {
            errors.push({ message: 'Invalid Last Name.', field: 'last_name' });
        }
    }
    // Validate email
    if (formObj.hasOwnProperty('email')) {
        data.email_id = formObj.email;
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formObj.email) === false) {
            errors.push({ message: 'Invalid email address.', field: 'email' });
        } else {
            // Check if email exists in the database
            if (rules.hasOwnProperty('email')) {
                if (rules.email == 'exists') {
                    if (await UserDAO.emailExists(formObj.email) === false) {
                        errors.push({ message: 'The email does not exist.', field: 'email' });
                    }
                }
                if (rules.email == 'unique') {
                    if (await UserDAO.emailExists(formObj.email)) {
                        errors.push({ message: 'The email already exists.', field: 'email' });
                    }
                }
            }
        }
    }

    // Validate password
    if (formObj.hasOwnProperty('password')) {
        data.password = passwordHash.generate(formObj.password);
        if (rules.hasOwnProperty('password')) {
            if (rules.password == 'verify') {
                
                // Verify user password
                if (await UserDAO.emailExists(formData.email)) {
                    const user = await UserDAO.getUserByEmail(formObj.email);
                    data = user;
                    if (passwordHash.verify(formObj.password, user.password) === false) {
                        errors.push({ message: 'Passwords is incorrect.', field: 'password' });
                    }
                }
            }
        } else {
            const confirmPassword = formObj.confirm_password || '';
            if (formObj.password.length >= 8) {
                if (formObj.password != confirmPassword) {
                    errors.push({ message: 'Passwords do not match.', field: 'password' });
                }
            } else {
                errors.push({ message: 'Password must be at least 8 characters.', field: 'password' });
            }
        }
    }
    // Validate user type
    if (formObj.hasOwnProperty('user_type')) {
        data.user_type = formObj.user_type;
        if (formObj.user_type != 'driver' && formObj.user_type != 'rider') {
            errors.push({ message: 'User type is invalid.', field: 'user_type' });
        }
    }

        // Validate ethereum account
    if(rules.hasOwnProperty('register')){
        if (formObj.hasOwnProperty('ethereum_address')) {
            data.eth_account = (formObj.ethereum_address.substring(0, 2) != '0x') ? '0x' + formObj.ethereum_address : formObj.ethereum_address;

            if (data.eth_account.length != 42) {
                errors.push({ message: 'Invalid Ethereum address.', field: 'ethereum_address' });
            }
        }

        // Validate ethereum private key
        if (formData.hasOwnProperty('ethereum_private_key')) {
            data.eth_private_key = (formData.ethereum_private_key.substring(0, 2) != '0x') ? '0x' + formData.ethereum_private_key : formData.ethereum_private_key;

            if (data.eth_private_key.length != 66) {
                errors.push({ message: 'Invalid Ethereum private key.', field: 'ethereum_private_key' });
            }
        }

        // Verify ethereum account
        if (data.hasOwnProperty('eth_account') && data.hasOwnProperty('eth_private_key')) {
            PeerContract.init();
            
            if (PeerContract.verifyAccount(data.eth_account, data.eth_private_key) === false) {
                errors.push({ message: 'Could not connect to Ethereum account.', field: 'ethereum_address' });
            }
        }

        //verify if user is not already registered with the ethereum account
        if (data.hasOwnProperty('eth_account') && data.hasOwnProperty('eth_private_key')) {
            
            const userHash = crypto.createHash('sha256').update(data.eth_account,data.email).digest('hex');

            PeerContract.init();
            
            //check if 0th entry is 0x0
            if (await PeerContract.getUser(userHash, data.eth_account)[0] != "0x0000000000000000000000000000000000000000" ) {
                console.log('user found');
                errors.push({ message: 'Ethereum account already registered', field: 'ethereum_address' });
            }
            console.log('user not found');
        }
    }

    return { errors, data };
}


function authenticate (req, res, next) {
    // Get token from cookie
    const token = req.body.lg_token
    || req.query.lg_token
    || req.headers['x-access-token']
    || req.cookies.lg_token;

    if (!token) {
        res.status(401).json({ message: 'Token is not provided.' });
    } else {
        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized access.' });
            } else {
                //next();
                // Check if token exit in database
                DB.execute(
                    mysql.format('SELECT * FROM users WHERE token = ?', [token]), 
                    (err, results, fields) => {
                        if (err) throw err;

                        if (results.length == 0) {
                            res.status(401).json({ message: 'Unauthorized access.' });
                        } else {
                            next();
                        }
                    }
                );
            }
        })

    }
}

module.exports = {
    validate,
    authenticate
}