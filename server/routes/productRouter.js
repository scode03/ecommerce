import express from "express";

import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from "../controllers/productController.js";

const router = express.Router();

// CRUD Product

// Create Data Product
// post /api/v1/product
// middleware owner
router.post("/", createProduct);

// All Data Product
// get /api/v1/product
router.get("/", allProduct);

// Detail Data Product
// get /api/v1/product/:id
router.get("/:id", detailProduct);

// Update Data Product
// put /api/v1/product/:id
// middleware owner
router.put("/:id", updateProduct);

// Delete Data Product
// delete /api/v1/product/:id
// middleware owner
router.delete("/:id", deleteProduct);

// File Upload Data Product
// post /api/v1/product/file-upload
// middleware owner
router.post("/file-upload", fileUpload);

export default router;
