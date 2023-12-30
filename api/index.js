import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import UserRouter from "./routes/user.router.js";
import authenticationroutes from "./routes/auth.router.js";
import  dotenv from "dotenv";
dotenv.config();
mongoose
  .connect(
    "mongodb+srv://nadeemahmadmalik:275618349m@cluster0.h7yahsv.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log(colors.rainbow("Connected to MongoDb!"));
  })
  .catch((err) => {
    console.log(err);
  });
const app = express();
app.listen(3000, () => {
  console.log("Server is running to port 3000");
});
app.use(express.json());
app.use("/api", authenticationroutes);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
