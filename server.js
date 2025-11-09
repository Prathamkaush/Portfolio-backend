import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend dev server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/contact", contactRouter);

app.listen(4000, () => console.log("Backend running on port 4000"));
