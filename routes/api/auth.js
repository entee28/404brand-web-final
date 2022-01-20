const router = require('express').Router();
const User = require('../../models/User');
const CryptoJS = require('crypto-js')
const config = require('config')
const jwt = require('jsonwebtoken')

// @route POST api/auth/register
// @desc Register User
// @access Public
router.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, config.get('PASS_SEC').toString()),
    });

    newUser.save().then(user => res.status(201).json(user)).catch(err => res.status(500).json(err));
})

// @route POST api/auth/Login
// @desc Login
// @access Public
router.post('/login', async (req, res) => {
    User.findOne({ username: req.body.username })
        .then(user => {
            if (!user) {
                return res.status(401).json({ msg: 'Wrong credentials!' });
            }

            const hashedPassword = CryptoJS.AES.decrypt(
                user.password,
                config.get('PASS_SEC')
            );
            const ogPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
            if (ogPassword !== req.body.password) {
                return res.status(401).json({ msg: 'Wrong credentials!' });
            }

            const accessToken = jwt.sign({
                id: user._id,
                isAdmin: user.isAdmin
            }, config.get("JWT_SEC"),
                { expiresIn: '3d' })
            const { password, ...others } = user._doc;
            res.status(200).json({ ...others, accessToken });
        }).catch(err => res.status(500).json(err));
})


module.exports = router;
