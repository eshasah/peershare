const jwt       = require('jsonwebtoken');
const UserDAO   = require('../model/UserDAO');
const CarDAO    = require('../model/CarDAO');

module.exports = {

    addCar: async (req, res) => {

        // Get data from post
        let postData = req.body;

        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        // Get user
        const user = await UserDAO.getUserById(T.user_id);

        // Add to database
        await CarDAO.addCar(postData);

        res.status(200).json({ message: "Successfully added a car"})
    },

    getCarsList: async (req, res) => {

        // Get all available cars
        const cars = await CarDAO.getAvailableCars();

        res.status(200).json({ data: cars });

    },

    getCar: async (req, res) => {

        // Get car id
        const carId = req.params.id;

        const car = await CarDAO.getCarById(carId);

        if (Object.keys(car).length > 0) {
            res.status(200).json({ data: car });
        } else {
            res.status(400).json({ message: 'Car not found.' });
        }

    }

}