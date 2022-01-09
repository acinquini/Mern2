const express = require('express');
const connectDB = require('./config/db');

const envs = require('./config/config');

// Connect to MongoDB
connectDB();

// Initialize middleware
const app = express();
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));

// To handle local development together with deploy in heroku (production)
const PORT = envs.PORT || process.env.PORT;
const HOST = envs.HOST || process.env.HOST;
const NODE_ENV = envs.NODE_ENV || process.env.NODE_ENV;

console.log(`Host: ${HOST} port: ${PORT} node_env: ${NODE_ENV}`);

// production
if (NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

// Note: app.listen creates the server
app.listen(PORT, HOST, () => console.log(`Server started on ${HOST} at port ${PORT} `));
