// controllers/authController.js
const User = require('../models/User.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });
};

// Register User
exports.register = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        const token = generateToken(user._id);

        res.status(201).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ success: false, error: 'Invalid credentials' });
        }

        const token = generateToken(user._id);

        res.status(200).json({ success: true, token });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
};
