const router = require('express').Router();
const Category = require('../models/category');

// POST request - create category
router.post('/categories', async (req, res) => {
    try {
        const category = new Category();
        category.type = req.body.type;

        // save category
        await category.save();

        res.json({
            success: true,
            message: 'Successfully created a new category'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// POST request - get all categories
router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find();

        res.json({
            success: true,
            categories
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})


module.exports = router;