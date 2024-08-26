// server.js
const express = require('express');
const connectDB = require('./config/db.js');
const authRoutes = require('./routes/authRoutes.js');
require('dotenv').config();

const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
