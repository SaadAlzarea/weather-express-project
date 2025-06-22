import { Request, Response } from "express";
import axios from "axios";
import { Weather } from "../models/weather.model";

const API_KEY = process.env.OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    res.status(400).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "JWT expired or malformed.",
      },
    });
  }

  const latRounded = Math.round(Number(lat) * 100) / 100;
  const lonRounded = Math.round(Number(lon) * 100) / 100;

  try {
    // Check the cache
    const cachedWeather = await Weather.findOne({
      lat: latRounded,
      lon: lonRounded,
    });
    if (cachedWeather) {
      res.json({
        source: "cache",
        coordinates: { lat: latRounded, lon: lonRounded },
        tempC: cachedWeather.data.main.temp - 273.15, // Convert from Kelvin to Celsius
        humidity: cachedWeather.data.main.humidity,
        description: cachedWeather.data.weather[0].description,
        fetchedAt: cachedWeather.fetchedAt,
      });
    }

    // Fetch from OpenWeather API
    const response = await axios.get(BASE_URL, {
      params: {
        lat: latRounded,
        lon: lonRounded,
        appid: API_KEY,
      },
    });

    // Save to database
    const newWeather = await Weather.create({
      lat: latRounded,
      lon: lonRounded,
      data: response.data,
    });

    res.json({
      source: "openweather",
      coordinates: { lat: latRounded, lon: lonRounded },
      tempC: response.data.main.temp - 273.15,
      humidity: response.data.main.humidity,
      description: response.data.weather[0].description,
      fetchedAt: newWeather.fetchedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: {
        code: "INVALID_TOKEN",
        message: "JWT expired or malformed.",
      },
    });
  }
};
