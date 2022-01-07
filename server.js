require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Initialize middleware
const app = express();
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// Note: app.listen creates the server
const { PORT, HOST } = process.env;
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST} at port ${PORT} `));
