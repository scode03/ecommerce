import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

import { notFound, errorHandler } from "../middlewares/errorMiddleware.js";
import authRouter from "./routes/authRouter.js";

dotenv.config();

const app = express();
const port = 3000;

// Parent Router
app.use("/api/v1/auth", authRouter);
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connection DB
mongoose.connect(process.env.DATABASE, {}).then(() => {
  console.log("Database Connected");
});
