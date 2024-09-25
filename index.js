import express, { json } from 'express';
import { connect } from 'mongoose';
import userRoute from './src/routes/user.js';

const app = express();
app.use(json());

// Connect to MongoDB
connect('mongodb://localhost:27017/TestDB', {
});

// Use the user route
app.use('/', userRoute);

// Start the server
app.listen(3002, () => {
    console.log('Server is running on port 3002');
});
