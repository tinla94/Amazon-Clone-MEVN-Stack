const router = require('express').Router();
const Product = require('../models/product');
const upload = require('../middlewares/upload-photo');

// POST request - create a new product
router.post('/products', upload.single("photo"),async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.location;
        product.stockQuantity = req.body.stockQuantity;

        // save product
        await product.save();

        res.status(201).json({
            status: true,
            message: 'Successfully saved',
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// GET request - get all products
router.get('/products', async (req ,res) => {
    try {
        let products = await Product.find();

        res.json({
            success: true,
            products
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// GET request - get a single product
router.get('/products/:id', async (req ,res) => {
    try {
        let product = await Product.findById({ _id: req.params.id });

        res.json({
            success: true,
            product
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// PUT request - update a single product
router.put('/products/:id', upload.single('photo'), async (req ,res) => {
    const { title, price, categoryID, description, ownerID } = req.body;
    try {
        let product = await Product.findByIdAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    title,
                    price,
                    category: categoryID,
                    photo: req.file.location,
                    description,
                    owner: ownerID
                },
            },
            { upsert: true }
        );

        res.json({
            success: true,
            updatedProduct: product
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

// DELETE request - delet4e a single product
router.delete('/products/:id', async (req ,res) => {
    try {
        let product = await Product.findByIdAndDelete({ _id: req.params.id });

        res.json({
            success: true,
            message: 'Deleted product successfully',
            deletedProduct:  product
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;