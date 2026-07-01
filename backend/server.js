import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { initDB } from "./models/index.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";

// Load configuration environment variables
const envResult = dotenv.config();
if (envResult.error) {
  console.error("Environment configuration: failed to load .env variables and not working properly.", envResult.error);
} else {
  console.log("Environment configuration: .env variables loaded successfully and working properly.");
}

const app = express();
const PORT = process.env.PORT || 8000;

// Enable CORS requests for local frontend connection and live Vercel app
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://127.0.0.1:5173",
      "https://dentist-chi-livid.vercel.app",
      "https://rangasdental.in",
      "https://www.rangasdental.in"
    ],
    credentials: true,
  })
);
console.log("CORS configuration: live frontend domains whitelisted successfully and working properly.");

// Express JSON body parser middleware
app.use(express.json());
console.log("Request parser: JSON middleware initialized successfully and working properly.");

// Routes middleware
app.use("/dentist-form/api/appointments", appointmentRoutes);
console.log("Route mounting: appointment API endpoints mounted successfully and working properly.");

// Health check endpoint
app.get("/dentist-form/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server health check: backend server is online and working properly.",
  });
});

// Sync database and start listening
const startServer = async () => {
  try {
    console.log("Database connection: attempting to connect and sync database...");
    // Connect and sync database models
    await initDB();
    console.log("Database status: live database is connected and working properly.");
  } catch (dbError) {
    console.error("Database status: database connection failed and database is not working properly.", dbError);
  }

  try {
    app.listen(PORT, () => {
      console.log(`Server status: backend listener started successfully and working properly on port ${PORT}`);
    });
  } catch (serverError) {
    console.error(`Server status: failed to start listener on port ${PORT} and not working properly.`, serverError);
  }
};

startServer();
