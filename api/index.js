import express from "express";
import colors from "colors";
import mongoose from "mongoose";
import UserRouter from "./routes/user.router.js";
import authenticationroutes from "./routes/auth.router.js";
import listingRouter from "./routes/listing.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
mongoose
  .connect(
    process.env.mongodb
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
// parse cookies
app.use(cookieParser())
  

app.use("/api", UserRouter);
app.use("/api", authenticationroutes);
app.use("/api/listing", listingRouter);


app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
