import express from "express";
import cors from "cors";
import contactRouter from "./routes/contact.js";

const app = express();
const port = process.env.PORT || 4000 ;
app.use(
  cors({
    origin: "https://pratham-kaushik.vercel.app/", // your frontend dev server
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  })
);

app.use(express.json());
app.use("/api/contact", contactRouter);

app.listen(port, () => console.log("Backend running on port "+ port));
