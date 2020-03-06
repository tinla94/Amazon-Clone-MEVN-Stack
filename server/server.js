require('dotenv').config(); // for .env file
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// app
const app = express();
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
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// Home page
app.get("/", (req, res) => {
    res.json("Hello Amazon Clone");
});

// PORT
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server running on port ${port}`));
