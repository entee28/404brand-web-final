import express from "express";
import mongoose from "mongoose";
import path from "path";
import errorHandler from "./middleware/error";
import cors from "cors";
import {
  auth,
  cart,
  contacts,
  orders,
  products,
  stripe,
  users,
} from "./routes/api";
import * as dotenv from "dotenv";

dotenv.config();
const app = express();

// Bodyparser Middleware
app.use(express.json());

// Connect to Mongo
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(cors({ origin: "*" }));

// Use Routes
app.use("/api/products", products);
app.use("/api/contacts", contacts);
app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/cart", cart);
app.use("/api/orders", orders);
app.use("/api/checkout", stripe);

// Error Handler
app.use(errorHandler);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server started on port ${port}`));
