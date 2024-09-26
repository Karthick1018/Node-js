import pkg from 'jsonwebtoken';
import express from 'express';
const { verify } = pkg;


const app = express();

// Middleware to verify JWT token
const Auth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        res.status(401).send('Authentication required.');
        return;
    }
    verify(token, 'your_secret_key', (err, decoded) => {
        if (err) {
            res.status(403).send('Invalid token.');
            return;
        } else {
            req.user = decoded;
            next();
        }
    });
};

// Usage
app.get('/protected', Auth, (req, res) => {
    // Accessible only by users with a valid JWT token
    res.send('Protected route');
});

export default Auth;
