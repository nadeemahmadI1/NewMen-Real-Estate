import { errorHandler } from "../Utils/error.js";
import User from "../models/User.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => {
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

export const Signin = async (req, res, next) => {
  // console.log(process.env.JWT_SECRET);
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, "User not Found"));
    }
    const validpassword = bcryptjs.compareSync(password, validUser.password);
    if (!validpassword) {
      return next(errorHandler(401, "Invalid credentials! "));
    }
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validUser._doc;
    res
      .cookie("access_token", token, { hhtpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
// module.exports = { Signup, Signin };
