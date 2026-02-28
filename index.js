import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const port = process.env.PORT || 4000;

// Allow your production domain, localhost for dev, and any Vercel preview URL
const allowedOrigins = [
  "https://pratham-kaushik.vercel.app",
  "http://localhost:5173",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:3000",
];

function corsOrigin(origin, callback) {
  // Allow requests with no origin (e.g. Postman)
  if (!origin) return callback(null, true);
  if (allowedOrigins.includes(origin)) return callback(null, origin);
  if (origin.endsWith(".vercel.app")) return callback(null, origin);
  callback(null, false);
}

app.use(
  cors({
    origin: corsOrigin,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: false,
  })
);

app.use(express.json());
app.use("/api/contact", contactRouter);

app.listen(port, () => console.log("Backend running on port "+ port));
