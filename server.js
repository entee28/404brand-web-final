const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');

const app = express();

// Bodyparser Middleware
app.use(express.json());

// Connect to Mongo
mongoose.connect(process.env.mongoURI || config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/products', require('./routes/api/products'));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));