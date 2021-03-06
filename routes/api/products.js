const express = require('express');
const { verifyTokenAndAdmin, verifyToken } = require('../../middleware/verifyToken');
const router = express.Router();

// Product Model
const Product = require('../../models/Product');

//  @route GET api/products
//  @desc Get All Products
//  @access Public
router.get('/', (req, res) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => res.status(500).json({ message: 'Server error' }))
});

//  @route GET api/products/:id
//  @desc Get A Products By ID
//  @access Public
router.get('/:id', (req, res) => {
    Product.findById(req.params.id)
        .then(product => res.json(product))
        .catch(err => res.status(404).json({ success: false }))
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