import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
  // Name Product
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [
      true,
      "Name product is already taken. Please choose a different one.",
    ],
  },
  // Price Product
  price: {
    type: Number,
    required: [true, "Price product is required"],
  },
  // Description Product
  description: {
    type: String,
    reqired: [true, "Description product is required"],
  },
  // Image Product
  image: {
    type: String,
    default: null,
  },
  // Category Product
  category: {
    type: String,
    required: [true, "Category product is required"],
    enum: ["shoes", "shirts", "pants", "jackets", "hoodies"],
  },
  // Stock Product
  stock: {
    type: String,
    default: 0,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
