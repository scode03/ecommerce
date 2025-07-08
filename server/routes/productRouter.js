import express from "express";

import {
  protectedMiddleware,
  adminMiddleware,
} from "../middlewares/authMiddleware.js";

import {
  createProduct,
  allProduct,
  detailProduct,
  updateProduct,
  deleteProduct,
  fileUpload,
} from "../controllers/productController.js";

import { upload } from "../utils/uploadFileHandler.js";

const router = express.Router();

// CRUD Product

// Create Data Product
// post /api/v1/product
// middleware owner
router.post("/", protectedMiddleware, adminMiddleware, createProduct);

// All Data Product
// get /api/v1/product
router.get("/", allProduct);

// Detail Data Product
// get /api/v1/product/:id
router.get("/:id", detailProduct);

// Update Data Product
// put /api/v1/product/:id
// middleware owner
router.put("/:id", protectedMiddleware, adminMiddleware, updateProduct);

// Delete Data Product
// delete /api/v1/product/:id
// middleware owner
router.delete("/:id", protectedMiddleware, adminMiddleware, deleteProduct);

// File Upload Data Product
// post /api/v1/product/file-upload
// middleware owner
router.post(
  "/file-upload",
  protectedMiddleware,
  adminMiddleware,
  upload.single("image"),
  fileUpload
);

export default router;
