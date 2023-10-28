import asyncHandler from "../middleware/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

const protect = asyncHandler(async (req, res, next) => {
  try {
    let token = req.cookies.jwt;

    if (token) {
      const decode = jwt.decode(token, process.env.JWT_SECRETE);
      const user = await User.findById(decode.userId).select("-password");
      if (user) {
        req.user = user;
        console.log(req.user);
        next();
      } else {
        res.status(401).json({ message: "User not found" });
      }
    } else {
      res.status(401).json({ message: "Token not provided" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export { protect };
