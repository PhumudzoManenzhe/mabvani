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

const corsOptions = {
  origin(origin, callback) {
    if (!origin || env.clientUrls.includes(origin) || !env.isProduction) {
      callback(null, true);
      return;
    }

    callback(new Error("This origin is not allowed by CORS."));
  },
  credentials: true,
};

app.use(helmet());
//app.use(cors(corsOptions));
//const cors = require("cors");

app.use(
  cors({
    origin: ["http://localhost:5500", "https://project-lzhx2.vercel.app"],
    credentials: true,
  }),
);
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
