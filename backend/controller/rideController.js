const jwt = require('jsonwebtoken');
const UserDAO = require('../model/UserDAO');
const CarDAO = require('../model/CarDAO');
const RideDAO = require('../model/RideDAO');
const PeerContract = require('../blockchain/scripts/PeerContractTest');
const txnController = require('./TxnController');

module.exports = {

    bookRide: async (req, res) => {
        // // Get user
        const user = await UserDAO.getUserById(req.body.userId);
        // // Get ride info from request
        const car_id = req.body.vehicleId;
        const source = req.body.source;
        const destination = req.body.destination;
        const fare = req.body.fare;

        // // Get car
        const car = await CarDAO.getCarById(car_id);

        console.log(car + " : " + car.user_id);

        if (Object.keys(car).length > 0) {
            console.log(req.body.userId + " 28 " + req.body.source);

            // Get owner details
            const owner = await UserDAO.getUserById(car.user_id);
            // console.log(owner.eth_account);

            console.log(car.user_id + " 34 " + owner);
            // Get user detail
            const user = await UserDAO.getUserById(req.body.userId);
            // console.log(user)
            // console.log(car)
            console.log(req.body.userId + " 37 " + req.body.source);

            //PeerContract.init();
           // console.log(car.hash,owner.eth_account, user.eth_account,user.eth_private_key);
           // invoke the blockchain and use rentCar method on carHash and borrower ethAccount
            PeerContract.rentCar(car.hash, user.eth_account).then(
                
                    async transactionResult => {
                        //console.log("rent car tx:", transactionResult);
                        
                        console.log(req.body.userId + " 43 " + req.body.source);
                        //Update car status
                        await CarDAO.updateCar({ status: 'unavailable' }, car_id);
                        //Add ride information to the database
                        await RideDAO.addRide({ car_id: car_id, user_id: user.user_id, source: source, destination: destination, ride_amount: fare});
                        console.log(fare);
                        // add the transaction using transaction module
                        const tx = await txnController.performPayment(user.eth_account,owner.eth_account,fare);
                        console.log('tx money transfer:', tx.transactionHash);
                        res.status(200).json({ data: "Success" });
                        //res.status(200).json({ data: transactionResult });
                    }
                
            ).catch(err => {
                console.log(err);
            });

        } else {
            console.log(req.body.userId + " : " + req.body.source);
            res.status(404).json({ message: "Car not found." });
        }

    },

    completeRide: async (req, res) => {

        // Get token decoded
       // const T = jwt.verify(req.cookies.lg_token, process.env.JWT_SECRET_KEY);

        // Get ride id
        const rideId = req.body.ride_id;

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
                const user = await UserDAO.getUserById(req.body.user_id);

                //TODO: Add transaction to bloackchain
                
                //PeerContract.init();
                PeerContract.returnCar(car.hash, user.eth_account).then(
                    async transactionResult => {

                        // Update car status
                        await CarDAO.updateCar({ status: 'Available' }, car.car_id);

                        // Update ride
                        await RideDAO.cancelRide({ride_status: 'Completed'}, rideId);

                        res.status(200).json({ data: transactionResult });
                    }
                ).catch(err => {
                    console.log(err);
                });
            } else {
                res.status(404).json({ message: "Car not found." });
            }

        } else {
            res.status(404).json({ message: "Ride not found." });
        }

    },

    getRidesList: async (req, res) => {

        // Get all rides
        const rides = await RideDAO.getRides(req.query.userId);
        res.status(200).json({ data: rides });

    },

    getRide: async (req, res) => {

        // Get ride id
        const rideId = req.body.ride_id;

        const ride = await RideDAO.getRideById(rideId);

        if (Object.keys(ride).length > 0) {
            res.status(200).json({ data: ride });
        } else {
            res.status(400).json({ message: 'Ride not found.' });
        }

    },
    getRidesForCar: async (req, res) => {

        const carId=req.query.carId;
        // Get all rides
        const rides = await RideDAO.getRidesByCarId(carId);

        res.status(200).json({ data: rides });

    },

}