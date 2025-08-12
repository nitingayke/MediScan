import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/initDB.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 9000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);

connectDB();

app.get("*", (req, res) => {
  res
    .status(502)
    .send({ result: "Hey, you are looking for a page that doesn't exist!" });
});


app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});


const startServer = async () => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

startServer();
 