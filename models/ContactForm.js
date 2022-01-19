const mongoose = require('mongoose');

const ContactFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
    },
    message: {
        type: String,
        required: true
    },
})

module.exports = ContactForm = mongoose.model('contact', ContactFormSchema);