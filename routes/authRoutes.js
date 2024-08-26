// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authControllers.js');
const { protect, authorize } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Example of a protected route
router.get('/user', protect, (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user,
    });
});

// Example of a role-based protected route
router.get('/admin', protect, authorize('admin'), (req, res) => {
    res.status(200).json({
        success: true,
        data: 'Admin content',
    });
});

module.exports = router;
