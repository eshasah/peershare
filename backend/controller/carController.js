const jwt = require('jsonwebtoken');
const UserDAO = require('../model/UserDAO');
const CarDAO = require('../model/CarDAO');
const crypto    = require('crypto');
const moment    = require('moment');
const PeerContract = require('../blockchain/scripts/PeerContractTest');
module.exports = {

    addCar: async (req, res) => {
        // Get data from post
        let postData = req.body;
        // generate sha256 hash for car module using car,owner and time info
        postData.hash= '0x'+crypto.createHash('sha256').update(postData.model + postData.user_id + (new Date()).getTime()).digest('hex');

        // // Get user
        const user = await UserDAO.getUserById(postData.user_id);
        // invoke the blockchain and use addCar method on carHash and owner ethAccount
        const tx = await PeerContract.addCar(postData.hash, user.eth_account,user.eth_private_key);
        console.log('tx:', tx)
        // addCar to the database
        const car= await CarDAO.addCar(postData);
        let carDetails=req.body;
        // response 
        carDetails.car_id=car[0].insertId;
                res.status(200).json({ carDetails: carDetails });
    },

    getAvailableCarsList: async (req, res) => {

        // Get all available cars
        const cars = await CarDAO.getAvailableCars();

        res.status(200).json({ data: cars });

    },
    getCarsList: async (req, res) => {

        // Get all available cars
        const cars = await CarDAO.getCars();

        res.status(200).json({ data: cars });

    },

    getCar: async (req, res) => {
        
        // Get car id
        const carId = req.body.car_id;
    
        const car = await CarDAO.getCarById(carId);
    
        if (Object.keys(car).length > 0) {
            res.status(200).json({ data: car });
        } else {
            res.status(400).json({ message: 'Car not found.' });
        }

    },

    getCarsByUser: async (req, res) => {
        const token = req.body.lg_token
        || req.query.lg_token
        || req.headers['x-access-token']
        || req.cookies.lg_token;

        // Get token decoded
        const T = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const cars = await CarDAO.getCarsByUserId(T.id);

        res.status(200).json({ data: cars });
    },

    getCarByUserId: async (req, res) => {
        
        console.log('req',req);
        const userId = req.query.userId;
        
     
        const car = await CarDAO.getCarsByUserId(userId);
        if (Object.keys(car).length > 0) {
            res.status(200).json({ data: car });
        } else {
            res.status(400).json({ message: 'Car not found.' });
        }

    },

}