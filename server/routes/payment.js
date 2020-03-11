const router = require('express').Router();
const moment = require('moment');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const requireLogin = require('../middlewares/requireLogin');
const Order = require("../models/order");

// Create a shipment model
const SHIPMENT = {
   normal: {
       price: 13.98,
       days: 7
   },
   fast: {
       price: 25.98,
       days: 3
   } 
}

/* Shipment price */
function shipmentPrice(shipmentOption) {
    // Get estimated day for package arrival
    let estimated = moment()
        .add(shipmentOption.days, "d")
        .format("dddd MMMM Do");
     
    return {
        estimated,
        price: shipmentOption.price
    }
}

/* Create a shipment */
router.post('/shipment', (req, res) => {
    let shipment;
    if (req.body.shipment === "normal") {
        shipment = shipmentPrice(SHIPMENT.normal);
    } else {
        shipment = shipmentPrice(SHIPMENT.fast);
    }

    res.json({ 
        success: true,
        shipment
    });
});


/* Create a payment */
router.post('/payment', requireLogin, (req, res) => {
    // stripe rule to multiply 100 for true value
    let totalPrice = Math.round(req.body.totalPrice * 100);
    
    // create stripe
    stripe.customers.create({
        email: req.decoded.email
    })
    .then(customer => {
        return stripe.customers.createSource(customer.id, {
            source: 'tok_visa'
        });
    })
    .then(source => {
        return stripe.charges.create({
            amount: totalPrice,
            currency: 'usd',
            customer: source.customer
        });
    })
    .then(async charge => {
        let order = new Order();
        let cart = req.body.cart;

        cart.map(product => {
            order.products.push({
                productID: product._id,
                quantity: parseInt(product.quantity),
                price: product.price
            });
        });

        order.owner = req.decoded._id;
        order.estimatedDelivery = req.body.estimatedDelivery;
        order.totalPrice = req.body.totalPrice;

        await order.save();

        res.json({
            success: true,
            message: 'Successfully make a payment'
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message: err.message
        })
    })
});


module.exports = router;