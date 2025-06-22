// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import logger from "../utils/logger";

// // dotenv.config();

// export async function connectDB() {
//   try {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     if (!MONGODB_URI) {
//       logger.error("MONGODB_URI is not defined");
//       process.exit(1); // Exit process if URI is undefined
//     }

//     // Connect to MongoDB
//     await mongoose.connect(MONGODB_URI);

//     if (mongoose.connection.db) {
//       await mongoose.connection.db.admin().command({ ping: 1 });
//       console.log("Pinged your deployment. You successfully connected to MongoDB!");
//     }
//   } catch (err) {
//     console.error("Error connecting to MongoDB:", err);

//     // Disconnect from MongoDB and exit on failure
//     await mongoose.disconnect();
//     process.exit(1);
//   }
// }

import mongoose from "mongoose";
import dotenv from "dotenv";
import logger from "../utils/logger";

dotenv.config();

export async function connectDB() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(process.env.MONGODB_URI as string);
    if (mongoose.connection.db) {
      await mongoose.connection.db.admin().command({ ping: 1 });
    }
    logger.info(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } catch (error: any) {
    await mongoose.disconnect();
    logger.error(`Error in connect to MongoDB!: ${error.message}`);
  }
}
