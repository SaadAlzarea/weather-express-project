// import express, { Express, Request, Response, NextFunction } from "express";
// // import cors from "cors";
// // import helmet from "helmet";
// // import morgan from "morgan";
// import dotenv from "dotenv";
// import logger from "./utils/logger";
// import { dev } from "./utils/helpers";
// import { OK, INTERNAL_SERVER_ERROR } from "./utils/http-status";
// import weatherRoutes from "./routers/weather.router";
// import userAuth from "./routers/user.router";


// const app: Express = express();
// const port = 3000
// // Load environment variables   
// dotenv.config();

// // Middleware
// // app.use(cors());
// // app.use(helmet());
// // app.use(
// //   morgan("tiny", {
// //     stream: {
// //       write: (message) => logger.info(message.trim()),
// //     },
// //   })
// // );
// // app.use(express.json());

// // ! this is to show timestamp
// // app.use(express.urlencoded({ extended: true })); //

// // ur app
// app.get("/", (req, res) => {
//   res.send("Hello, world!");
// });

// app.use("/auth/signup", userAuth)
// app.use("/auth/signin", userAuth)
// app.use("/auth/signout", userAuth)
// app.use("/weather", weatherRoutes);

// // Routes

// // Basic route

// // Basic error handling middleware
// app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
//   logger.error("Error:", err.message);
//   res.status(INTERNAL_SERVER_ERROR).json({
//     success: false,
//     message: "Something went wrong!",
//     error: dev ? err.message : undefined,
//   });
// });

// // Start server
// app.listen(port, () => {
//   console.log(`I'm ready, on http://localhost:${port}`);
// });

import express, { Express, Request, Response, NextFunction } from 'express';
import logger from './utils/logger';
import dotenv from 'dotenv';
import { connectDB } from './config/database';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routers/user.router'
import { INTERNAL_SERVER_ERROR } from './utils/http-status';
import historyRoutes from './routers/history.router'
import weatherRoutes from './routers/weather.router'

const app: Express = express();

dotenv.config();

// middleware
app.use(helmet());
app.use(cors());
app.use(cors());
app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/auth', authRoutes);
app.use('/history', historyRoutes);
app.use('/weather', weatherRoutes);

// Basic error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err.message);
  res
    .status(INTERNAL_SERVER_ERROR) 
    .json({
      success: false,
      message: `Something went wrong! ${err.message}`,
      error: process.env.NODE_ENV == 'development' ? err.message : undefined
    });
});


app.listen(process.env.PORT, () => {
    logger.info(`Server Listen at Port ${process.env.PORT}`)
    connectDB()
})