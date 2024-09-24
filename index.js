const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./src/routes/user');

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TestDB', {
});

// Use the user route
app.use('/', userRoute);

// Start the server
app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
