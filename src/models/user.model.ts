import mongoose, { Document, Schema } from "mongoose";

export interface userInterface extends Document {
  id: string;
  email: string;
  passwordHash: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

// User
const userSchema = new mongoose.Schema({
  _id: Object,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  passwordHash: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

export const User = mongoose.model('User', userSchema)
