const passwordHash = require('password-hash');
const UserDAO      = require('../model/UserDAO');

module.exports = {
    validate: async (formData, rules) => {

        // Parse json
        formData = JSON.parse(JSON.stringify(formData));

        // To store errors.
        errors = [];

        // To store data
        data = {};

        // Validate first name
        if (formData.hasOwnProperty('first_name')) {
            data.first_name = formData.first_name.toLowerCase();

            if (/^[a-zA-Z]+$/.test(formData.first_name) === false) {
                errors.push({ message: 'Invalid First Name.', field: 'first_name' });
            }

        }

        // Validate last name
        if (formData.hasOwnProperty('last_name')) {
            data.last_name = formData.last_name.toLowerCase();

            if (/^[a-zA-Z]+$/.test(formData.last_name) === false) {
                errors.push({ message: 'Invalid Last Name.', field: 'last_name' });
            }

        }

        // Validate email
        if (formData.hasOwnProperty('email')) {
            data.email = formData.email;

            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email) === false) {
                errors.push({ message: 'Invalid email address.', field: 'email' });
            } else {

                // Check if email exists in the database
                if (rules.hasOwnProperty('email')) {
                    if (rules.email == 'exists') {
                        if (await UserDAO.emailExists(formData.email) === false) {
                            errors.push({ message: 'The email does not exist.', field: 'email' });
                        }
                    }

                    if (rules.email == 'unique') {
                        if (await UserDAO.emailExists(formData.email)) {
                            errors.push({ message: 'The email already exists.', field: 'email' });
                        }
                    }
                }

            }
        }

        // Validate password
        if (formData.hasOwnProperty('password')) {
            data.password = passwordHash.generate(formData.password);

            if (rules.hasOwnProperty('password')) {
                if (rules.password == 'verify') {
                    
                    // Verify user password
                    if (await UserDAO.emailExists(formData.email)) {
                        const user = await UserDAO.getUserByEmail(formData.email);

                        if (passwordHash.verify(formData.password, user.password) === false) {
                            errors.push({ message: 'Passwords is incorrect.', field: 'password' });
                        }

                    }

                }
            } else {
                const confirmPassword = formData.confirm_password || '';
                
                if (formData.password.length >= 8) {
                    if (formData.password != confirmPassword) {
                        errors.push({ message: 'Passwords do not match.', field: 'password' });
                    }
                } else {
                    errors.push({ message: 'Password must be at least 8 characters.', field: 'password' });
                }
            }
        }

        // Validate user type
        if (formData.hasOwnProperty('user_type')) {
            data.type = formData.user_type;

            if (formData.user_type != 'owner' && formData.user_type != 'borrower') {
                errors.push({ message: 'User type is invalid.', field: 'user_type' });
            }
        }

        // Validate ethereum account
        if (formData.hasOwnProperty('ethereum_address')) {
            data.eth_account = (formData.ethereum_address.substring(0, 2) != '0x') ? '0x' + formData.ethereum_address : formData.ethereum_address;

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

        // TODO: Verify ethereum account


        return { errors, data };

    }

}