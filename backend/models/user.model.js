import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String, 
    required: [true, "Password is required"],
  },
  phone: {
    type: String,
    required: true,
    default: false,
  },
  address: {
    type: String,
    required: true,
  },
  role: {
    type: Number,
    default: 0,
  },
},{timestamps: true});

export const User = mongoose.model("User", userSchema);
