import EmpModel from "../model/EmpModel.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'

const JWT_SECRET = 'your_secret_key';

export async function Signup(req, res) {
    try {
        // Create a new employee
        const data = new EmpModel({
            email: req.body.email,
            password: req.body.password
        });

        // Hash the password
        const hashedPass = await bcrypt.hash(data.password, 10);
        console.log('hashedPass: ', hashedPass);

        // Update the password field with the hashed password
        data.password = hashedPass;

        // Check if the user exists
        const existUser = await EmpModel.findOne({ email: data.email }).collation({ locale: 'en', strength: 2 });

        if (existUser) {
            return res.status(400).send('User already exists');
        } else {
            // Save the new user in the database
            const savedUser = await data.save();
            if (savedUser) {
                // Email configuration
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASS
                    },
                    // logger: true, // Enable logging
                    // debug: true
                });

                // Email options
                const mailOptions = {
                    from: 'karthichamp15@gmail.com',
                    to: data.email,
                    subject: 'Signup Successful!',
                    text: `Hello ${data.email},\n\nThank you for signing up! Your account has been created successfully.\n\nBest regards,\nTeam`
                };

                console.log(mailOptions);

                // Send the email
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log('Error sending email: ', error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }

            return res.status(201).send('User created successfully');
        }

    } catch (e) {
        console.error(e);
        return res.status(500).send('Server error');
    }
}


export async function Login(req, res) {
    try {
        const loginData = {
            email: req.body.email,
            password: req.body.password
        };

        // Check if the user exists in the database
        const user = await EmpModel.findOne({ email: loginData.email }).collation({ locale: 'en', strength: 2 });

        if (!user) {
            return res.status(400).send('User not found');
        }

        // Compare the provided password with the hashed password in the database
        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }

        const token = jwt.sign(
            { id: user._id, email: user.email },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Send the JWT token in the response
        return res.status(200).json({
            message: 'Login successful',
            token: token
        });

    } catch (e) {
        console.error(e);
        return res.status(500).send('Server error');
    }
}