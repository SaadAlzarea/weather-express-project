// import mongoose, { Document, Schema } from "mongoose";

// interface WeatherInterface extends Document {
//   id: string;
//   lat: number;
//   lon: number;
//   date: string;
//   fetchedAt: Date;
// }
// const weatherSchema = new mongoose.Schema({
//   _id: Object,
//   lat: Number, // rounded(2)
//   lon: Number,
//   data: mongoose.Schema.Types.Mixed, // raw OpenWeather JSON
//   fetchedAt: Date, // TTL-indexed
// });

// export const Weather = mongoose.model('Weather', weatherSchema)
import mongoose, { Schema, Document } from "mongoose";

interface WeatherData extends Document {
  lat: number;
  lon: number;
  data: any; // OpenWeather raw JSON
  fetchedAt: Date;
}

const weatherSchema = new Schema<WeatherData>({
  lat: { type: Number, required: true },
  lon: { type: Number, required: true },
  data: { type: Schema.Types.Mixed, required: true },
  fetchedAt: { type: Date, default: Date.now, index: { expires: "1h" } },
});

export const Weather = mongoose.model<WeatherData>("Weather", weatherSchema);
