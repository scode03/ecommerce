import asyncHandler from "../middlewares/asyncHandler.js";

export const createProduct = asyncHandler(async (req, res) => {
  res.send("Create Product");
});

export const allProduct = asyncHandler(async (req, res) => {
  res.send("View All Product");
});

export const detailProduct = asyncHandler(async (req, res) => {
  res.send("View Detail Product");
});

export const updateProduct = asyncHandler(async (req, res) => {
  res.send("Update Product");
});

export const deleteProduct = asyncHandler(async (req, res) => {
  res.send("Delete Product");
});

export const fileUpload = asyncHandler(async (req, res) => {
  res.send("File Upload Product");
});
