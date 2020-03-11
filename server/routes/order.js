const router = require('express').Router();
const Order = require('../models/order');
const requireLogin = require("../middlewares/requireLogin");

/* Get orders */
router.get('/orders', requireLogin, async (req, res) => {
    try {
        let products = await Order.find({
            owner: req.decoded._id
        })
        .deepPopulate('owner products.productID.owner')
        .exec();

        res.json({
            success: true,
            products
        })
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
});


module.exports = router;