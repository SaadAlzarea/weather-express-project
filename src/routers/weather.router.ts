import express from "express";
import { Router } from 'express';
import {getWeather} from "../controllers/weather.controller"
// const router = express.Router();
const router = Router();

router.get("/weather", getWeather);

export default router;
