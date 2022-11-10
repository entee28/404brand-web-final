"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const verifyToken_1 = require("../../middleware/verifyToken");
const Product_1 = __importDefault(require("../../models/Product"));
const router = express_1.default.Router();
router.get("/", (_, res) => {
    Product_1.default.find()
        .then((products) => res.json(products))
        .catch(() => res.status(500).json({ message: "Server error" }));
});
router.get("/:id", (req, res) => {
    Product_1.default.findById(req.params.id)
        .then((product) => res.json(product))
        .catch(() => res.status(404).json({ success: false }));
});
router.post("/", verifyToken_1.verifyTokenAndAdmin, (req, res) => {
    const newProduct = new Product_1.default({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        countInStock: req.body.countInStock,
        imageUrl: req.body.imageUrl,
    });
    newProduct
        .save()
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(500).json(err));
});
router.put("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => {
    Product_1.default.findByIdAndUpdate(req.params.id, {
        $set: req.body,
    }, { new: true })
        .then((product) => res.status(200).json(product))
        .catch((err) => res.status(500).json(err));
});
router.delete("/:id", verifyToken_1.verifyTokenAndAdmin, (req, res) => {
    Product_1.default.findById(req.params.id)
        .then((product) => product === null || product === void 0 ? void 0 : product.remove().then(() => res.json({ success: true })))
        .catch(() => res.status(404).json({ success: false }));
});
exports.default = router;
//# sourceMappingURL=products.js.map