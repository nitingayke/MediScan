import { verifyAccessToken } from "../utils/tokenService.js";

export const requireAuth = (req, res, next) => {
  const hdr = req.get("Authorization") || "";

  const token = hdr.startsWith("Bearer ") ? hdr.slice(7) : null;

  if (!token) return res.status(401).json({ error: "Missing token" });
  const decoded = verifyAccessToken(token);

  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  req.user = decoded;
  next();
};
