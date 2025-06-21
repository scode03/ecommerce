import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    unique: [true, "Username is already taken. Please choose a different one."],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already in use. Try another email address."],
    validate: {
      validator: validator.isEmail,
      message: "Please enter a valid email address.",
    },
  },
  password: {
    type: String,
    reqired: [true, "Password is required"],
    minLength: [6, "Oops! Your password needs to be at least 6 characters."],
  },
  role: {
    type: String,
    enum: ["user", "owner"],
    default: "user",
  },
});

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (reqBody) {
  return await bcrypt.compare(reqBody, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;
