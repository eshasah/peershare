const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

module.exports = function(req, res, next) {

    // Get token from cookie
    const token = req.cookies.lg_token;

    if (!token) {
        res.status(401).json({ message: 'Token is not provided.' });
    } else {

        // Verify token
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized access.' });
            } else {
                next();
                // // Check if token exit in database
                // DB.execute(
                //     mysql.format('SELECT * FROM `users` WHERE `token` = ?', [token]), 
                //     (err, results, fields) => {
                //         if (results.length == 0) {
                //             res.status(401).json({ message: 'Unauthorized access.' });
                //         } else {
                //             const user = results[0];

                //             if (user.type == 'borrower') {
                //                 next();
                //             } else {
                //                 res.status(401).json({ message: 'Unauthorized access.' });
                //             }
                //         }
                //     }
                // );
            }
        })

    }

}