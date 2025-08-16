import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length < 0) {
    res.status(400);
    throw new Error("Cart is empty!");
  }

  let orderItem = [];
  let total = 0;

  for (const cart of cartItem) {
    const productData = await Product.findOne({ _id: cart.product });
    if (!productData) {
      res.status(404);
      throw new Error("Product id not found!");
    }

    const { name, price, _id } = productData;
    const singleProduct = {
      quantity: cart.quantity,
      name,
      price,
      product: _id,
    };
    orderItem = [...orderItem, singleProduct];

    total += cart.quantity * price;
  }

  const order = await Order.create({
    itemDetail: orderItem,
    total,
    firstName,
    lastName,
    email,
    phone,
    user: req.user.id,
  });

  res.status(201).json({
    total,
    order,
    message: "Add order product succesful",
  });
});

export const ViewAllOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "View order product succesful",
  });
});

export const DetailOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "View detail order product succesful",
  });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "View user current order product succesful",
  });
});
