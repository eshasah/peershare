const mysql  = require('mysql2');
const moment = require('moment');

const addRide = async (rideData) => {
    // Add created date
    rideData.created_at  = moment().format("YYYY-MM-DD HH:mm:ss");
    rideData.returned_at = null;
    return await DB.execute(mysql.format('INSERT INTO rides SET ?', rideData));
}

const cancelRide = async (rideData, id) => {
    rideData.returned_at = moment().format("YYYY-MM-DD HH:mm:ss");
    return await DB.execute(mysql.format('UPDATE rides SET ? WHERE ride_id = ?', [rideData, id]));
}

const getRides = async (userId) => {
    const [rideQueryResults, rideQueryFields] = await DB.execute('SELECT * FROM rides WHERE user_id = ?', [userId]);
    return (rideQueryResults.length > 0) ? rideQueryResults : []
}

const getRideById = async (id) => {
    const [rideQueryResults, rideQueryFields] = await DB.execute('SELECT * FROM rides WHERE ride_id = ?', [id]);
    return (rideQueryResults.length > 0) ? rideQueryResults[0] : {}
}

const getCurrentRides = async (userId) => {
    const [rideQueryResults, rideQueryFields] = await DB.execute('SELECT * FROM rides WHERE user_id = ? AND returned_at IS NULL', [userId]);
    return (rideQueryResults.length > 0) ? rideQueryResults : [];
}

module.exports = {
    addRide,
    cancelRide,
    getRides,
    getRideById,
    getCurrentRides
}