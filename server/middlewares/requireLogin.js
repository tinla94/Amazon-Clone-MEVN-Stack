const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    let token = req.headers["x-access-token"] || req.headers["authorization"];
    let checkBearer = "Bearer ";


    if (token) {
        // check token start with Bearer
        if (token.startsWith(checkBearer)) {
            token = token.slice(checkBearer.length, token.length);
        }

        // decoding token for authentication
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err) {
                res.json({
                    success: false,
                    message: 'Failed to authenticate'
                });
            } else {
                // decoded = user
                req.user = decoded;
                next(); // move on
            };
        });
    } else {
        res.json({
            success: false,
            message: 'Please sign in your account!'
        });
    };
}