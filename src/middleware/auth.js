import jwt from "jsonwebtoken";
import User from "../models/user/User.model.js";
import _conf from "../conf/config.js";
import { asyncHandler } from "../utils/asyncHandlear.js";

export const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (req.cookies.token) {
    token = req.cookies.token;
  }
  if (!token) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }
  try {
    const decoded = jwt.verify(token, _conf.jwt_secret);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Not authorized to access this route" });
  }
});

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: `User role ${req.user.role} is not authorized to access this route`,
        });
    }
    next();
  };
};
