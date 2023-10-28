import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRETE, {
    expiresIn: "30d",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: true,
    secure: process.env.PROJECT_ENV !== "developer",
    maxAge: 30 * 24 * 60 * 60 * 1000,
  });
};

export default createToken;
