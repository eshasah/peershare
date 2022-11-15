const jwt = require('jsonwebtoken');
const UserDAO = require('../model/UserDAO');
const CarDAO = require('../model/CarDAO');
const crypto    = require('crypto');
const moment    = require('moment');
const PeerContract = require('../blockchain/scripts/PeerContract');
module.exports = {

    addCar: async (req, res) => {
        // Get data from post
        let postData = req.body;
        // // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
        postData.hash= '0x'+crypto.createHash('sha256').update(postData.model + postData.make + postData.user_id + (new Date()).getTime()).digest('hex');
        // console.log(postData.hash);
        // // Get user
        const user = await UserDAO.getUserById(postData.user_id);
        // Add to database
        // console.log(user);
        PeerContract.init();
        PeerContract.addCar(postData.hash, user.eth_account,user.eth_private_key).then(
            async transactionResult => {
                await CarDAO.addCar(postData);
                res.status(200).json({ data: transactionResult })
            }
        ).catch(err => {
            console.log(err);
        });
    },

    getCarsList: async (req, res) => {

        // Get all available cars
        const cars = await CarDAO.getAvailableCars();

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

    }

}