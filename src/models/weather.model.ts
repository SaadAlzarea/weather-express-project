import mongoose, { Document, Schema } from "mongoose";

interface WeatherInterface extends Document {
  id: string;
  lat: number;
  lon: number;
  date: string;
  fetchedAt: Date;
}
const weatherSchema = new mongoose.Schema({
  _id: Object,
  lat: Number, // rounded(2)
  lon: Number,
  data: mongoose.Schema.Types.Mixed, // raw OpenWeather JSON
  fetchedAt: Date, // TTL-indexed
});

export const Weather = mongoose.model('Weather', weatherSchema)
