const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    getUserById: async (id) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `user_id` = ?', [id]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    getUserByEmail: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `email_id` = ?', [email]);
        return (userQueryResults.length > 0) ? userQueryResults[0] : {};
    },

    emailExists: async (email) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * from `users` WHERE `email_id` = ?', [email]);
        return (userQueryResults.length > 0);
    },

    ethAccountExists: async (ethAccount) => {
        const [userQueryResults, userQueryFields] = await DB.execute('SELECT * FROM `users` WHERE `eth_account` = ?', [ethAccount]);
        return (userQueryResults.length > 0);
    },

    addUser: async (userData) => {

        // Add default values
        userData.img       = '';
        userData.create_at = moment().format('YYYY-MM-DD');

        return await DB.execute(mysql.format('INSERT INTO `users` SET ? ', userData));

    },

    updateUser: async (userData, id) => {
        return await DB.execute(mysql.format('UPDATE `users` SET ? WHERE `id` = ?', [userData, id]));
    }

}