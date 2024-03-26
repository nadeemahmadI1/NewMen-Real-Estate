import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return next(errorHandler(401, "Authentication token not provided"));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      // Handle token verification errors
      if (err.name === "TokenExpiredError") {
        return next(errorHandler(401, "Authentication token expired"));
      } else if (err.name === "JsonWebTokenError") {
        return next(errorHandler(401, "Invalid authentication token"));
      } else {
        return next(errorHandler(500, "Internal Server Error"));
      }
    }

    // Token is valid, set user on request object
    req.user = user;
    next();
  });
};
