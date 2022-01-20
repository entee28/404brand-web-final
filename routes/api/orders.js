const express = require('express');
const { verifyTokenAndAdmin } = require('../../middleware/verifyToken');
const router = express.Router();

// Order Model
const Order = require('../../models/Order');

//  @route GET api/orders
//  @desc Get All Orders
//  @access Private
router.get('/', verifyTokenAndAdmin, (req, res) => {
    Order.find()
        .then(orders => res.json(orders))
        .catch(err => res.status(500).json({ message: 'Server error' }))
});

//  @route GET api/orders/income
//  @desc Get Monthly Income
//  @access Private
router.get('/income', verifyTokenAndAdmin, (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

    Order.aggregate([
        { $match: { createdAt: { $gte: previousMonth } } },
        {
            $project: {
                month: { $month: "$createdAt" },
                sales: "$amount"
            },
        },
        {
            $group: {
                _id: "$month",
                total: { $sum: "$sales" }
            }
        }
    ]).then(data => res.status(200).json(data))
        .catch(err => res.status(500).json(err))
});

// @route POST api/products
// @desc Create A Product
// @access Private/Admin
router.post('/', verifyTokenAndAdmin, (req, res) => {
    const newProduct = new Product({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        imageUrl: req.body.imageUrl
    });

    newProduct.save().then(product => res.status(200).json(product))
        .catch(err => res.status(500).json(err))
})

// @route PUT api/products/:id
// @desc Update a product
// @access Private/Admin
router.put('/:id', verifyTokenAndAdmin, (req, res) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, { new: true })
        .then(product => res.status(200).json(product))
        .catch(err => res.status(500).json(err))
})

// @route DELETE api/products/:id
// @desc Delete A Product
// @access Private/Admin
router.delete('/:id', verifyTokenAndAdmin, (req, res) => {
    Product.findById(req.params.id)
        .then(product => product.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }))
})

module.exports = router;