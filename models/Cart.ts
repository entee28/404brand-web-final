import mongoose from "mongoose";

interface ICart {
  userId: string;
  products: {
    productId: string;
    quantity: number;
  }[];
}

const CartSchema = new mongoose.Schema<ICart>(
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
  },
  { timestamps: true }
);

const Cart = mongoose.model<ICart>("Cart", CartSchema);
export default Cart;
