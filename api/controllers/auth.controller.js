import { errorHandler } from "../Utils/error.js";
import User from "../models/User.model.js";
import bcryptjs from 'bcryptjs';
export const Signup =async (req, res,next) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const newuser = new User({ username, email, password: hashedPassword });
//   console.log(newuser);
  try {
    await newuser.save();
    res.status(201).json("User created Successfully");
  } catch (error) {
    // next(errorHandler(550,'Error from the function'));
    next(error);
  }
};
