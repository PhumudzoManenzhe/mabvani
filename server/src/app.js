/**
 * Express application configuration for the UniApply SA REST API.
 */

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const { env } = require("./config/environment");
const requestLogger = require("./middleware/requestLogger");
const rateLimiter = require("./middleware/rateLimiter");
const errorHandler = require("./middleware/errorHandler");
const healthRoutes = require("./routes/healthRoutes");
const profileRoutes = require("./routes/profileRoutes");
const resultRoutes = require("./routes/resultRoutes");
const documentRoutes = require("./routes/documentRoutes");
const universityRoutes = require("./routes/universityRoutes");
const programmeRoutes = require("./routes/programmeRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");
const cartRoutes = require("./routes/cartRoutes");
const applicationRoutes = require("./routes/applicationRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Hardcoded safe origins combined with your environment variable origins
const allowedOrigins = [
  "http://127.0.0.1:5500", // Browser Live Server default
  "http://localhost:5500", // Alternate local address
  "https://project-lzhx2.vercel.app", // Your Vercel frontend production build
];

// If you have extra URLs configured in your Render environment variables, add them dynamically
if (env.clientUrls && Array.isArray(env.clientUrls)) {
  allowedOrigins.push(...env.clientUrls);
}

const corsOptions = {
  origin(origin, callback) {
    // 1. Allow internal server-to-server calls or tool testing like Postman (where origin is undefined)
    // 2. Allow anything if explicitly running in a non-production test phase
    // 3. Match against our consolidated allowed origins list
    if (!origin || !env.isProduction || allowedOrigins.includes(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`Origin ${origin} is not allowed by CORS structure.`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"], // Explicitly greenlight your client's custom API request headers
};

app.use(helmet());
app.use(cors(corsOptions)); // This application layer setup now safely covers all avenues

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rateLimiter);
app.use(requestLogger);

app.use("/api/health", healthRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/results", resultRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/universities", universityRoutes);
app.use("/api/programmes", programmeRoutes);
app.use("/api/recommendations", recommendationRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/admin", adminRoutes);

app.use("/api", (request, response) => {
  response.status(404).json({
    success: false,
    message: "API endpoint not found.",
  });
});

app.use(errorHandler);

module.exports = app;
