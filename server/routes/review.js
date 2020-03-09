const router = require('express').Router();
const Review = require("../models/review");
const Product = require("../models/product");
const requireLogin = require("../middlewares/requireLogin");
const upload = require('../middlewares/upload-photo');

/* Add reviews for product */
// verify token -> upload photo
router.post('/reviews/:productID', [requireLogin, upload.single('photo')], async (req, res) => {
    const { headline, body, rating } = req.body; 
    try {
        const review = new Review();
        review.headline = headline;
        review.body = body;
        review.rating = rating;
        review.photo = req.file.location;
        review.user = req.decoded._id;
        review.productID = req.params.productID;

        // update product with rating 
        await Product.update({ $push: { reviews: review._id } });
        // save review and product
        const savedReview = await review.save();

        if(savedReview) {
            res.json({
                success:true,
                message: 'Review has been added successfully'
            });
        }
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


/* GET reviews for product */
router.get('/reviews/:productID', async (req, res) => {
    try {
        const productReviews = await Review.find({
            productID: req.params.productID
        })
        .populate('user')
        .exec();

        res.json({
            success: true,
            reviews: productReviews
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})

module.exports = router;