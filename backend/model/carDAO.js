const mysql  = require('mysql2');
const moment = require('moment');

const addCar = async (carData) => {
    carData.created_at = moment().format("YYYY-MM-DD");
    carData.status = 'Available';
    return await DB.execute(mysql.format('INSERT INTO `cars` SET ?', carData));
}

const updateCar = async (carData, id) => {
    return await DB.execute(mysql.format('UPDATE cars SET ? WHERE car_id = ?', [carData, id]));
}

const getCars = async () => {
    return await DB.execute('SELECT * FROM cars ORDER BY car_id');
}

const getCarById = async (id) => {
    const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM cars WHERE car_id = ?', [id]);
    return (carQueryResults.length > 0) ? carQueryResults[0] : {};
}

const getCarsByUserId = async (userId) => {
    const [carQueryResults, carQueryFields] = await DB.execute('SELECT * FROM cars WHERE user_id = ? ORDER BY car_id', [userId]);
    return (carQueryResults.length > 0) ? carQueryResults : [];
}

const getAvailableCars = async () => {
    return await DB.execute('SELECT * FROM cars WHERE status = ? ORDER BY car_id', ['available']);
}

const getUnavailableCars = async () => {
    return await DB.execute('SELECT * FROM cars WHERE status = ? ORDER BY car_id', ['unavailable']);
}

module.exports = {
    addCar,
    updateCar,
    getCars,
    getCarById,
    getCarsByUserId,
    getAvailableCars,
    getUnavailableCars
}