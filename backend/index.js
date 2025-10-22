// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { userRoute } from "./routes/userRoute.js";
// import { residencyRoute } from "./routes/residencyRoute.js";

// dotenv.config();
// const app = express();
// // PORT definition is unnecessary in a serverless export environment

// // Define CORS options using the allowed origins you specified
// const corsOptions = {
//     origin: ["https://real-estate-project-henna-seven.vercel.app", "http://localhost:3000", ],
//     withCredentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
// };

// // Middleware
// app.use(express.json());
// app.use(cookieParser());

// // Use CORS middleware (this handles all preflight OPTIONS requests automatically)
// app.use(cors(corsOptions));

// // FIX: Removed the problematic line 'app.options("*", cors(corsOptions))'
// // which was causing the PathError due to a conflict with '*' and path-to-regexp.


// // Routes
// app.use("/api/user", userRoute);
// app.use("/api/residency", residencyRoute);

// // Error handling middleware
// app.use((err, req, res, next) => {
//     const statusCode = err.statusCode || 500;
//     const message = err.message || "Internal Server Error";
//     return res.status(statusCode).json({
//         success: false,
//         statusCode,
//         message,
//     });
// });

// // Health check route
// app.get("/health", (req, res) => {
//     res.status(200).json({ status: "ok" });
// });

// // Vercel Serverless Export (Replaces app.listen)
// export default app;

// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { userRoute } from "./routes/userRoute.js";
// import { residencyRoute } from "./routes/residencyRoute.js";

// dotenv.config();
// const app = express();

// // ✅ Corrected CORS configuration
// const corsOptions = {
//   origin: [
//     "https://real-estate-project-henna-seven.vercel.app", // main frontend
//     "http://localhost:3000", // local React app
//     "http://localhost:5174", // local Vite app
//   ],
//   credentials: true, // ✅ correct key name (was 'withCredentials' before)
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // ✅ Middleware order matters — CORS must come before routes
// app.use(cors(corsOptions));
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Routes
// app.use("/api/user", userRoute);
// app.use("/api/residency", residencyRoute);

// // ✅ Error handler
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // ✅ Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// // ✅ Export for Vercel
// export default app;


// src/index.js
// import express from "express";
// import dotenv from "dotenv";
// import cors from "cors";
// import cookieParser from "cookie-parser";
// import { userRoute } from "./routes/userRoute.js";
// import { residencyRoute } from "./routes/residencyRoute.js";

// dotenv.config();
// const app = express();

// // ✅ Corrected CORS configuration
// const corsOptions = {
//   origin: [
//     "https://real-estate-project-henna-seven.vercel.app", // main frontend
//     "http://localhost:3000", // local React app
//     "http://localhost:5174", // local Vite app (admin frontend)
//   ],
//   credentials: true, // allow cookies and credentials
//   methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
// };

// // ✅ Middleware
// app.use(cors(corsOptions));  // CORS must come first
// app.use(express.json());
// app.use(cookieParser());

// // ✅ Routes
// app.use("/api/user", userRoute);
// app.use("/api/residency", residencyRoute);

// // ✅ Health check route
// app.get("/health", (req, res) => {
//   res.status(200).json({ status: "ok" });
// });

// // ✅ Error handling middleware
// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });

// // ✅ Start local server only if not running on Vercel
// const PORT = process.env.PORT || 5000;
// if (!process.env.VERCEL) {
//   app.listen(PORT, () => {
//     console.log(`✅ Local backend running at http://localhost:${PORT}`);
//   });
// }

// // ✅ Export app for Vercel serverless deployment
// export default app;

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoute } from "./routes/userRoute.js";
import { residencyRoute } from "./routes/residencyRoute.js";

dotenv.config();
const app = express();

// ✅ CORS configuration for frontend (Vite) on port 5173
const corsOptions = {
  origin: ["http://localhost:5173"], // your frontend app
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// ✅ Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// ✅ Routes
app.use("/api/user", userRoute);
app.use("/api/residency", residencyRoute);

// ✅ Health check route
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

// ✅ Error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ✅ Start local server on port 3000 (from .env or default)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
