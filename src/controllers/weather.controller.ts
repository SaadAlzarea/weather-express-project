import { Request, Response } from "express";
import { Weather } from "../models/weather.model";
import { History } from "../models/history.model";
import { verifyToken } from "../config/jwt";
import axios from "axios";
import { BAD_REQUEST, OK, UNAUTHORIZED } from "../utils/http-status";

export const getWeather = async (req: Request, res: Response) => {
  const { lon, lat } = req.query;

  const token = req.headers.authorization;
  const verify = verifyToken(token?.split(" ")[1] as string);
  if (!verify) {
    res.status(UNAUTHORIZED).json({
      success: false,
      error: {
        message: "You should to SignIn",
      },
    });
    return;
  }
  try {
    const weatherExist = await Weather.findOne({ lon: lon, lat: lat });
    console.log(weatherExist);
    if (weatherExist) {
      const newHistory = new History({
        user: verify.userId,
        weather: weatherExist._id,
      });
      await newHistory.save();
      res.status(OK).json({
        success: true,
        source: "cache",
        data: weatherExist,
      });
      return;
    }

    const getFromEApi = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`
    );
    const weatherData = await getFromEApi.data;

    const newWeather = new Weather({
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      data: {
        coordinates: weatherData.coord,
        tempC: parseFloat(weatherData.main.temp) - 272.15,
        humidity: weatherData.main.humidity,
        description: weatherData.weather[0].description,
      },
    });

    await newWeather.save();
    const newHistory = new History({
      user: verify.userId,
      weather: newWeather._id,
    });

    await newHistory.save();
    res.status(OK).json({
      success: true,
      source: "openweather",
      data: newWeather,
    });
  } catch (err: any) {
    res.status(BAD_REQUEST).json({
      success: false,
      error: {
        message: `Error in get weather: ${err.message}`,
      },
    });
  }
};
