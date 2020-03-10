const router = require('express').Router();
const axios = require("axios");
const Address = require("../models/address");
const User = require("../models/user");
const requireLogin = require('../middlewares/requireLogin');

/* POST API - Add address */
router.post('/addresses', requireLogin, async (req, res) => {
    const { country, fullName, streetAddress, city, state,zipCode, phoneNumber, deliveryInstructions, securityCode} = req.body;

    try {
        const newAddress = new Address();
        newAddress.country = country;
        newAddress.fullName = fullName;
        newAddress.streetAddress = streetAddress;
        newAddress.city = city;
        newAddress.state = state;
        newAddress.zipCode = zipCode;
        newAddress.phoneNumber = phoneNumber;
        newAddress.deliveryInstructions = deliveryInstructions;
        newAddress.securityCode = securityCode;
        newAddress.user = req.decoded._id;

        // save address
        await newAddress.save();

        res.json({
            success: true,
            message: 'Address has been added successfully'
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* GET API - Get user addresses */
router.get('/addresses', requireLogin, async (req, res) => {
    try {   
        let addresses = await Address.find({ user: req.decoded._id });
        console.log(req.decoded._id);

        res.json({
            success: true,
            addresses
        }); 
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* GET API - Get user address */
router.get('/addresses/:id', requireLogin, async (req, res) => {
    try {   
        let foundAddress = await Address.findOne({ _id: req.params.id });

        res.json({
            success: true,
            foundAddress
        }); 
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* PUT API - Edit user address */
router.put("/addresses/:id", requireLogin, async (req, res) => {
    const { country, fullName, streetAddress, city, state,zipCode, phoneNumber, deliveryInstructions, securityCode} = req.body;

    try {
        let foundAddress = await Address.findOneAndUpdate({ _id: req.params.id });
        if(foundAddress) {
            // Editing
            if(country) foundAddress.country = country;
            if(fullName) foundAddress.fullName = fullName;
            if(streetAddress) foundAddress.streetAddress = streetAddress;
            if(city) foundAddress.city = city;
            if(state) foundAddress.state = state;
            if(zipCode) foundAddress.zipCode = zipCode;
            if(phoneNumber) foundAddress.phoneNumber = phoneNumber;
            if(deliveryInstructions) foundAddress.deliveryInstructions = deliveryInstructions;
            if(securityCode) foundAddress.securityCode = securityCode;

            await foundAddress.save();

            res.json({
                success: true,
                message: "Successfully edit the address"
            })
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* DELETE API - Delete user address */
router.delete("/addresses/:id", requireLogin, async (req, res) => {
    try {
        let foundAddress = await Address.remove({ user: req.decoded._id, _id: req.params.id });

        if(foundAddress) {
            res.json({
                success: true,
                message: "Successfully edit the address"
            });
        };
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* PUT API  - Set user default addresses */
router.put('/addresses/set/default', requireLogin, async (req, res) => {
    try {
        let updateAddressUser = await User.findOneAndUpdate(
            { _id: req.decoded._id },
            { $set: { address: req.body.id } }
        );
        
        if(updateAddressUser) {
            res.json({
                success: true,
                message: "Successfully set this address as default"
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

/* GET API - Get list of country */
router.get("/countries", async (req, res) => {
    try {
        let response = await axios.get('http://restcountries.eu/rest/v2/all');

        res.json(response.data);
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});
module.exports = router;