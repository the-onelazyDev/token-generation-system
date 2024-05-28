const express = require('express');
const mongoose = require('mongoose');
const tokenRoutes = require('./routes/tokenRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Enable CORS


// Routes
app.use('/api', tokenRoutes);

// MongoDB connection
const connectionString = process.env.MONGODB_URI
const options = {
  autoIndex: true, 
  maxPoolSize: 10, 
  serverSelectionTimeoutMS: 5000, 
  family: 4 
};

mongoose.connect(connectionString, options)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });



// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
