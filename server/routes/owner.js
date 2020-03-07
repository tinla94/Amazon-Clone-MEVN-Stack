const router = require('express').Router();
const Owner = require('../models/owner');
const upload = require('../middlewares/upload-photo');


// POST request - create onwer
router.post('/owners', upload.single('ownerPhoto'), async (req, res) => {
    const {name, about} = req.body;

    try {
        let owner = new Owner();
        owner.name = name;
        owner.about = about;
        owner.photo = req.file.location

        // save owner
        await owner.save();

        res.json({
            success: true,
            message: 'Successfully create a new owner'
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});


// GET request - get all owners
router.get('/owners', async (req, res) => {
    try {
        let owners = await Owner.find();

        res.json({
            success: true,
            owners
        });
    } catch(err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
})


module.exports = router;