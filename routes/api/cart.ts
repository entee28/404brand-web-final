import express from "express";
import {
  verifyTokenAndAdmin,
  verifyToken,
  verifyTokenAndAuthorization,
} from "../../middleware/verifyToken";

const router = express.Router();

// Cart Model
import Cart from "../../models/Cart";

//  @route GET api/cart
//  @desc Get All Carts
//  @access Private/Admin
router.get("/", verifyTokenAndAdmin, (_, res) => {
  Cart.find()
    .then((carts) => res.json(carts))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

//  @route GET api/cart/:id
//  @desc Get User Cart By ID
//  @access Private
router.get("/:userId", verifyTokenAndAuthorization, (req, res) => {
  Cart.findOne({ userId: req.params.userId })
    .then((cart) => res.json(cart))
    .catch(() => res.status(404).json({ success: false }));
});

// @route POST api/cart
// @desc Create A Cart
// @access Private
router.post("/", verifyToken, (req, res) => {
  const newCart = new Cart({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    countInStock: req.body.countInStock,
    imageUrl: req.body.imageUrl,
  });

  newCart
    .save()
    .then((cart) => res.status(200).json(cart))
    .catch((err) => res.status(500).json(err));
});

// @route PUT api/cart/:id
// @desc Update cart
// @access Private
router.put("/:id", verifyTokenAndAuthorization, (req, res) => {
  Cart.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    { new: true }
  )
    .then((cart) => res.status(200).json(cart))
    .catch((err) => res.status(500).json(err));
});

// @route DELETE api/cart/:id
// @desc Delete A Cart
// @access Private
router.delete("/:id", verifyTokenAndAuthorization, (req, res) => {
  Cart.findById(req.params.id)
    .then((cart) => cart?.remove().then(() => res.json({ success: true })))
    .catch(() => res.status(404).json({ success: false }));
});

export default router;
