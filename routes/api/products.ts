import express from "express";
import { verifyTokenAndAdmin } from "../../middleware/verifyToken";
// Product Model
import Product from "../../models/Product";

const router = express.Router();

//  @route GET api/products
//  @desc Get All Products
//  @access Public
router.get("/", (_, res) => {
  Product.find()
    .then((products) => res.json(products))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

//  @route GET api/products/:id
//  @desc Get A Products By ID
//  @access Public
router.get("/:id", (req, res) => {
  Product.findById(req.params.id)
    .then((product) => res.json(product))
    .catch(() => res.status(404).json({ success: false }));
});

// @route POST api/products
// @desc Create A Product
// @access Private/Admin
router.post("/", verifyTokenAndAdmin, (req, res) => {
  const newProduct = new Product({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    imageUrl: req.body.imageUrl,
    author: req.body.author,
    genre: req.body.genre,
  });

  newProduct
    .save()
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
});

// @route PUT api/products/:id
// @desc Update a product
// @access Private/Admin
router.put("/:id", verifyTokenAndAdmin, (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((product) => res.status(200).json(product))
    .catch((err) => res.status(500).json(err));
});

// @route DELETE api/products/:id
// @desc Delete A Product
// @access Private/Admin
router.delete("/:id", verifyTokenAndAdmin, (req, res) => {
  Product.findById(req.params.id)
    .then((product) =>
      product?.remove().then(() => res.json({ success: true }))
    )
    .catch(() => res.status(404).json({ success: false }));
});

export default router;
