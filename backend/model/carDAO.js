const mysql  = require('mysql2');
const moment = require('moment');

module.exports = {

    addCar: async (carData) => {

        // Add created date
        carData.created_at = moment().format("YYYY-MM-DD");

        return await DB.execute(mysql.format('INSERT INTO `cars` SET ?', carData));

    },

    updateCar: async (carData, id) => {
        return await DB.execute(mysql.format('UPDATE `cars` SET ? WHERE `car_id` = ?', [carData, id]));
    },

    getCars: async () => {
        return await DB.execute('SELECT * FROM `cars` ORDER BY `car_id`');
    },

    getCarById: async (id) => {
        const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `car_id` = ?', [id]);
        return (carQueryResults.length > 0) ? carQueryResults[0] : {};
    },

    getCarsByUserId: async (userId) => {
        const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM `cars` WHERE `user_id` = ? ORDER BY `car_id`', [userId]);
        return (carQueryResults.length > 0) ? carQueryResults : [];
    },

    getAvailableCars: async () => {
        return await DB.execute('SELECT * FROM `cars` WHERE `status` = ? ORDER BY `car_id`', ['available']);
    },

    getUnavailableCars: async () => {
        return await DB.execute('SELECT * FROM `cars` WHERE `status` = ? ORDER BY `car_id`', ['unavailable']);
    }

}