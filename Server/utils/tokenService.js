import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const generateAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

export const verifyAccessToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
};
