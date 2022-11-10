import Order from "../../models/Order";
import express from "express";
import { verifyTokenAndAdmin, verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

// Order Model

//  @route GET api/orders
//  @desc Get All Orders
//  @access Private/Admin
router.get("/", verifyTokenAndAdmin, (_, res) => {
  Order.find()
    .then((orders) => res.json(orders))
    .catch(() => res.status(500).json({ message: "Server error" }));
});

//  @route GET api/orders
//  @desc Get User's Orders
//  @access Private/Admin
router.get("/find/:userId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//  @route GET api/orders/income
//  @desc Get Monthly Income
//  @access Private/Admin
router.get("/income", verifyTokenAndAdmin, (req, res) => {
  const productId = req.query.pid;
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));

  Order.aggregate([
    {
      $match: {
        createdAt: { $gte: previousMonth },
        ...(productId && {
          products: { $elemMatch: { productId } },
        }),
      },
    },
    {
      $project: {
        month: { $month: "$createdAt" },
        sales: "$amount",
      },
    },
    {
      $group: {
        _id: "$month",
        total: { $sum: "$sales" },
      },
    },
  ])
    .sort({ _id: 1 })
    .then((data) => res.status(200).json(data))
    .catch((err) => res.status(500).json(err));
});

// @route POST api/orders
// @desc Create An Order
// @access Private
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route PUT api/products/:id
// @desc Update an order
// @access Private/Admin
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

// @route DELETE api/products/:id
// @desc Delete An Order
// @access Private/Admin
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
