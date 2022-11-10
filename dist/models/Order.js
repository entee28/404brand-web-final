"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const OrderSchema = new mongoose_1.default.Schema({
    userId: { type: String, required: true },
    products: [
        {
            productId: {
                type: String,
            },
            quantity: {
                type: Number,
                default: 1,
            },
        },
    ],
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    status: {
        type: String,
        default: "PENDING",
        enum: ["PENDING", "COMPLETED", "CANCELLED"],
    },
}, { timestamps: true });
const Order = mongoose_1.default.model("Order", OrderSchema);
exports.default = Order;
//# sourceMappingURL=Order.js.map