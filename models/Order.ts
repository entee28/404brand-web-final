import mongoose from "mongoose";

interface IOrder {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
  amount: number;
  address: string;
  status: "PENDING" | "COMPLETED" | "CANCELLED";
}

const OrderSchema = new mongoose.Schema<IOrder>(
  {
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
  },
  { timestamps: true }
);

const Order = mongoose.model<IOrder>("Order", OrderSchema);
export default Order;
