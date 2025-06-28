import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";

export const createProduct = asyncHandler(async (req, res) => {
  const newProduct = await Product.create(req.body);

  res.status(201).json({
    message: "Add product succesful",
    data: newProduct,
  });
});

export const allProduct = asyncHandler(async (req, res) => {
  const data = await Product.find();

  res.status(200).json({
    message: "View all products succesful",
    data,
  });
});

export const detailProduct = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const productData = await Product.findById(paramsId);

  if (!productData) {
    res.status(404);
    throw new Error("Product not found");
  }

  return res.status(200).json({
    message: "View detail product succesful",
    data: productData,
  });
});

export const updateProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  const updateProduct = await Product.findByIdAndUpdate(paramId, req.body, {
    runValidators: false,
    new: true,
  });

  return res.status(201).json({
    message: "Update product succesful",
    data: updateProduct,
  });
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const paramId = req.params.id;
  await Product.findByIdAndDelete(paramId);

  return res.status(200).json({
    message: "Delete product succesfull",
  });
});

export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload Product");
});
