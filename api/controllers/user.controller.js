import bcryptjs from "bcryptjs";
import { errorHandler } from "../Utils/error.js";
import User from "../models/User.model.js";

export const test = (req, res) => {
  res.json({
    message: "Hello UserRouter",
    name: "Nadeem Ahmad",
  });
};

export const updateUser = async (req, res, next) => {
  // console.log(`User ID from req.user: ${req.user.id}`);
  // console.log(`User ID from req.params: ${req.params.id}`);
  if (req.user.id != req.params.id)
    return next(errorHandler(403, "You can't edit another user"));
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
          // || req.user.username,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return errorHandler(error, "You Can't delete other user");
  try {
    await User.findByIdAndDelete(req.params.id);
    res.clearCookie("access_token");
    res.status(200).json("User  has been deleted");
  } catch (error) {
    // console.log(error)
    next(error);
  }
};
