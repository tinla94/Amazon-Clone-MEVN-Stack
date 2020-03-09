const router = require('express').Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middlewares/requireLogin');


/* Sign up user */
router.post('/auth/signup', async (req, res) => {
    // define fields
    const { email, password, name } = req.body;

    if (!email || !password) {
        res.json({
            success: false,
            message: 'Please enter email or password'
        });
    } else {
        try {
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;

            // save user 
            await newUser.save();

            // Assign token
            let token = jwt.sign(
                    newUser.toJSON(), 
                    process.env.JWT_SECRET, 
                    { expiresIn: 604800 // 1 week 
                    }
                );

            // return 
            res.json({
                success: true,
                token,
                message: 'Successfully created a new user'
            });
        } catch(err) {
            res.status(500).json({
                success: false,
                message: err.message
            });
        };
    };
});


/* Sign in user */
router.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let foundUser = await User.findOne({ email });
        if (!foundUser) {
            res.status(403).json({
                success: false,
                message: 'Authentication failed! User is not found!'
            });
        } else {
            if (foundUser.comparePassword(password)) {
                let token  = jwt.sign(
                    foundUser.toJSON(), 
                    process.env.JWT_SECRET, 
                    { expiresIn: 604800 });
                    
                // return message
                res.json({
                    success: true,
                    token,
                    message: 'User is loged in successfully'
                })
            }
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* User Profile  */
router.get("/auth/user", requireLogin, async (req, res) => {
    try {
        let foundUser = await User.findOne({ _id: req.user._id });
        if(foundUser) {
            res.json({
                success: true,
                user: foundUser
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


module.exports = router;