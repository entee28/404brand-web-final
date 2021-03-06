const express = require('express');
const router = express.Router();

// ContactForm Model
const ContactForm = require('../../models/ContactForm');

//  @route GET api/contacts
//  @desc Get All Contact Forms
//  @access Public
router.get('/', (req, res) => {
    ContactForm.find()
        .then(forms => res.json(forms))
        .catch(err => res.status(500).json({ message: 'Server error' }))
});

// @route POST api/contacts
// @desc Submit Form
// @access Public
router.post('/', (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !message) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    const newForm = new ContactForm({
        name,
        email,
        subject,
        message
    });

    newForm.save().then(form => res.json(form));
})

module.exports = router;