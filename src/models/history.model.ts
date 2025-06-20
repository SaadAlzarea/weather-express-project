import mongoose, { Document, Schema } from "mongoose";

interface historyInterface extends Document {
  id: string;
  user: string;
  weather: string;
  lat: number;
  lon: number;
  requestedAt: Date;
}

const historySchema = new mongoose.Schema({
  _id: Object,
  user: {
    type: Object,
    ref: "User",
    index: true,
  },
  weather: {
    type: Object,
    ref: "Weather",
  },
  lat: Number,
  lon: Number,
  requestedAt: {
    type: Date,
    default: Date.now,
    index: true,
  },
});

export const History = mongoose.model('History', historySchema)
