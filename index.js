import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import routes from "./routes/appRoutes.js";
import { connectDb } from "./config/db.js";

dotenv.config();
const app = express();

app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development"
        ? "http://localhost:5173"
        : "https://employee-r.onrender.com",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);

const port = process.env.PORT || 5001;

connectDb().then(() => {
  app.listen(port, () => {
    console.log(`SERVER STARTED AT PORT : ${port}`);
  });
});
