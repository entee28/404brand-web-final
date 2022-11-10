"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Order_1 = __importDefault(require("../../models/Order"));
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const router = express_1.default.Router();
router.get("/", verifyToken_1.verifyTokenAndAdmin, (_, res) => {
    Order_1.default.find()
        .then((orders) => res.json(orders))
        .catch(() => res.status(500).json({ message: "Server error" }));
});
router.get("/find/:userId", verifyToken_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const orders = await Order_1.default.find({ userId: req.params.userId });
        res.status(200).json(orders);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get("/income", verifyToken_1.verifyTokenAndAdmin, (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(date.setMonth(lastMonth.getMonth() - 1));
    Order_1.default.aggregate([
        {
            $match: Object.assign({ createdAt: { $gte: previousMonth } }, (productId && {
                products: { $elemMatch: { productId } },
            })),
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
router.post("/", verifyToken_1.verifyToken, async (req, res) => {
    const newOrder = new Order_1.default(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.put("/:id", verifyToken_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        const updatedOrder = await Order_1.default.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, { new: true });
        res.status(200).json(updatedOrder);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.delete("/:id", verifyToken_1.verifyTokenAndAdmin, async (req, res) => {
    try {
        await Order_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json("Order has been deleted...");
    }
    catch (err) {
        res.status(500).json(err);
    }
});
exports.default = router;
//# sourceMappingURL=orders.js.map