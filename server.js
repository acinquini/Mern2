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

const { PORT, HOST, NODE_ENV } = process.env;

// production
if (NODE_ENV === 'production') {
    console.log("NODE_ENV = production")
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

// Note: app.listen creates the server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST} at port ${PORT} `));
