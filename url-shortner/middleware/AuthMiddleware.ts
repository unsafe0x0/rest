import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token missing" });
  }

  try {
    const secretKey = process.env.JWT_SECRET!;
    const decoded = jwt.verify(token, secretKey) as { userId: string };
    req.userId = decoded.userId as string;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
}
