const User = require('../../models/User')
const router = require('express').Router();
const { verifyTokenAndAdmin, verifyTokenAndAuthorization } = require('../../middleware/verifyToken')

// @route PUT api/users/:id
// @desc Update user
// @access Private
router.put('/:id', verifyTokenAndAuthorization, (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC.toString() || config.get('PASS_SEC').toString());
    }

    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(user => res.status(200).json(user))
        .catch(err => res.status(500).json(err))
})

// @route DELETE api/users/:id
// @desc Delete user
// @access Private
router.delete('/:id', verifyTokenAndAuthorization, (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(res.status(200).json({ msg: 'User has been deleted...' }))
        .catch(err => res.status(500).json(err))
})

// @route GET api/users/find/:id
// @desc Get a user
// @access Private
router.get('/find/:id', verifyTokenAndAdmin, (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            const { password, ...others } = user._doc;
            res.status(200).json(...others);
        })
        .catch(err => res.status(500).json(err))
})

// @route GET api/users
// @desc Get all user
// @access Private
router.get('/', verifyTokenAndAdmin, (req, res) => {
    const query = req.query.new;
    query ? User.find().sort({ _id: -1 }).limit(1) : User.find()
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => res.status(500).json(err))
})

// @route GET api/users/stats
// @desc Get user stats
// @access Private
router.get('/stats', verifyTokenAndAdmin, (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
                month: { $month: "$createdAt" }
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: 1 }
            }
        }
    ]).then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
})
module.exports = router;