// config/db.js
import mongoose from "mongoose";


//    Related data (for logs/branding)
const APP_NAME = "AutoRentX API";

//    MongoDB Connection
const connectDB = async () => {
  try {
    // Event listener (fires when DB is connected)
    mongoose.connection.on("connected", () =>
      console.log(`[${APP_NAME}] Database Connected ✅`)
    );

    // Connect using environment variable
    await mongoose.connect(process.env.MONGO_DB_URI);
  } catch (error) {
    console.log(`[${APP_NAME}] Database Connection Error ❌`, error.message);
  }
};

export default connectDB;
