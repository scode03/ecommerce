import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import Order from "../models/orderModel.js";

export const CreateOrder = asyncHandler(async (req, res) => {
  const { email, firstName, lastName, phone, cartItem } = req.body;

  if (!cartItem || cartItem.length < 1) {
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
  const orders = await Order.find();

  res.status(200).json({
    data: orders,
    message: "View order product succesful",
  });
});

export const DetailOrder = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const orderDetail = await Order.findById(paramsId);

  if (!orderDetail) {
    res.status(404);
    throw new Error("Product not found");
  }

  res.status(200).json({
    data: orderDetail,
    message: "View detail order product succesful",
  });
});

export const CurrentUserOrder = asyncHandler(async (req, res) => {
  const userOrder = await Order.find({ user: req.user.id });

  res.status(200).json({
    data: userOrder,
    message: "View order product by user succesful",
  });
});
