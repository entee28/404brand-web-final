"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const router = express_1.default.Router();
const Cart_1 = __importDefault(require("../../models/Cart"));
router.get("/", verifyToken_1.verifyTokenAndAdmin, (_, res) => {
    Cart_1.default.find()
        .then((carts) => res.json(carts))
        .catch(() => res.status(500).json({ message: "Server error" }));
});
router.get("/:userId", verifyToken_1.verifyTokenAndAuthorization, (req, res) => {
    Cart_1.default.findOne({ userId: req.params.userId })
        .then((cart) => res.json(cart))
        .catch(() => res.status(404).json({ success: false }));
});
router.post("/", verifyToken_1.verifyToken, (req, res) => {
    const newCart = new Cart_1.default({
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
router.put("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => {
    Cart_1.default.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true })
        .then((cart) => res.status(200).json(cart))
        .catch((err) => res.status(500).json(err));
});
router.delete("/:id", verifyToken_1.verifyTokenAndAuthorization, (req, res) => {
    Cart_1.default.findById(req.params.id)
        .then((cart) => cart === null || cart === void 0 ? void 0 : cart.remove().then(() => res.json({ success: true })))
        .catch(() => res.status(404).json({ success: false }));
});
exports.default = router;
//# sourceMappingURL=cart.js.map