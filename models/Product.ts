import mongoose from "mongoose";

interface IProduct {
  name: string;
  description: string;
  price: number;
  countInStock: number;
  imageUrl: string;
  author: string;
  genre?: string;
  seller: string;
}

const ProductSchema = new mongoose.Schema<IProduct>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  countInStock: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
  },
  seller: {
    type: String,
    required: true,
  },
});

const Product = mongoose.model<IProduct>("product", ProductSchema);
export default Product;
