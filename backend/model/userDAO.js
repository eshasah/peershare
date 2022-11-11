const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    getUserById: async (id) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM users WHERE user_id = ?', [id]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    getUserByEmail: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM users WHERE email_id = ?', [email]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    emailExists: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * from users WHERE email_id = ?', [email]);
        return (userQueryResults.length > 0);
    },

    ethAccountExists: async (ethAccount) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM users WHERE eth_account = ?', [ethAccount]);
        return (userQueryResults.length > 0);
    },

    addUser: async (userData) => {
        return await DB.execute(
            mysql.format('INSERT INTO users(f_name, l_name, email_id, user_type, created_at, password, eth_account, eth_private_key) VALUES (?,?,?,?,?,?,?,?) ', 
            [userData.f_name, userData.l_name, userData.email_id, userData.user_type, moment().format('YYYY-MM-DD'), userData.password, userData.eth_account, userData.eth_private_key]));
    },

    updateUser: async (userData, id) => {
        return await DB.execute(mysql.format('UPDATE users SET ? WHERE user_id = ?', [userData, id]));
    }

}