const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const config = require('config');
const errorHandler = require('./middleware/error')
const cors = require('cors')

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

app.use(cors({ origin: '*' }));

// Use Routes
app.use('/api/products', require('./routes/api/products'));
app.use('/api/contacts', require('./routes/api/contacts'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/cart', require('./routes/api/cart'));
app.use('/api/orders', require('./routes/api/orders'));
app.use('/api/checkout', require('./routes/api/stripe'));

// Error Handler
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));