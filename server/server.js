require('dotenv').config(); // for .env file
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// app
const app = express();

// require apis
const productRoutes = require('./routes/product');
const categoryRoutes = require('./routes/categories');
const ownerRoutes = require('./routes/owner');
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review');
const addressRoutes = require('./routes/address');
const paymentRoutes = require('./routes/payment');
const orderRoutes = require('./routes/order');


// Connect to mongodb
mongoose.connect(
    process.env.MONGO_URI,
    {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    .then(() => console.log(`Connecting to mongodb`))
    .catch(e => console.error(e.message));


// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// api routes
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api', ownerRoutes);
app.use('/api', authRoutes);
app.use('/api', reviewRoutes);
app.use('/api', addressRoutes);
app.use('/api', paymentRoutes);
app.use('/api', orderRoutes);



// Home page
app.get("/", (req, res) => {
    res.json("Hello Amazon Clone");
});

// PORT
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
