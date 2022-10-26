const jwt       = require('jsonwebtoken');
const moment    = require('moment');

const UserDAO   = require('../model/UserDAO');
const CarDAO    = require('../model/CarDAO');
const RideDAO = require('../model/RideDAO');
const PeerContract = require('../blockchain/scripts/PeerContract');

module.exports = {

    bookRide: async (req, res) => {
        // Get data from post
        // res.status(200).json({ data: 'Ride booked successfully.' });
        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
        // // Get user
        const user = await UserDAO.getUserById(T.id);
        // // Get car id
        const car_id = req.body.car_id;
        // // Get car
        // console.log(req.body.car_id);
        const car = await CarDAO.getCarById(car_id);
        // console.log(car)
        if (Object.keys(car).length > 0 && car.status == 'available') {

            // Get owner details
            const owner = await UserDAO.getUserById(car.user_id);

            // Get user detail
            const user = await UserDAO.getUserById(req.body.user_id);
            console.log(user)

            // console.log(car)

            PeerContract.init();
            PeerContract.rentCar(user.user_id, car_id, user.eth_account).then(
                async transactionResult => {
                    // Update car status
                    await CarDAO.updateCar({ status: 'unavailable' }, car_id);
                    // Add ride information
                    await RideDAO.addRide({ car_id: car_id, user_id: user.user_id });

                    res.status(200).json({ data: transactionResult });
                }
            ).catch(err => {
                console.log(err);
            });

        } else {
            res.status(404).json({ message: "Car not found." });
        }

    },


    completeRide: async (req, res) => {
        
        // Get token decoded
        const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);
    
        // Get ride id
        const rideId = req.params.id;

        // Get ride
        const ride = await RideDAO.getRideById(rideId);

        if (Object.keys(ride).length > 0) {

            // Get Car
            const car = await CarDAO.getCarById(ride.car_id);

            // Make sure car status is unavailable
            if (car.status == 'unavailable') {
    
                // Get owner details
                const owner = await UserDAO.getUserById(car.user_id);
    
                // Get user detail
                const user = await UserDAO.getUserById(T.id);
    
                //TODO: Add transaction to bloackchain


                // Update car status
                await CarDAO.updateCar({ status: 'available' }, car.id);

                // Update ride
                await RideDAO.updateRide({ returned_at: moment().format('YYYY-MM-DD') }, rideId);

                res.status(200).json({ data: transactionResult });

            } else {
                res.status(404).json({ message: "Car not found." });
            }

        } else {
            res.status(404).json({ message: "Ride not found." });
        }

    },

    getRidesList: async (req, res) => {

        // Get all rides
        const rides = await RideDAO.getRides();

        res.status(200).json({ data: rides });

    },

    getRide: async (req, res) => {

        // Get ride id
        const rideId = req.params.id;

        const ride = await RideDAO.getRideById(rideId);

        if (Object.keys(ride).length > 0) {
            res.status(200).json({ data: ride });
        } else {
            res.status(400).json({ message: 'Ride not found.' });
        }

    }

}