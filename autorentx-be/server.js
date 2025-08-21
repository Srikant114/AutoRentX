// server.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRouter from "./route/userRoutes.js";


//    Related data (simple constants)
const APP_NAME = "AutoRentX API"; // keep logs consistent with your project name

//    Initialize Express app
const app = express();

//    Connect to Database (MongoDB)
await connectDB();

//    Middleware
app.use(cors());            // enable CORS (default settings)
app.use(express.json());    // parse JSON request bodies

//    Health / Root Route
app.get("/", (req, res) => res.send(`${APP_NAME} • Server is running`));
app.use('/api/user', userRouter)

//    Start Server
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`[${APP_NAME}] Server is running on port ${PORT}`);
});

