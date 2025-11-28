import type { Request, Response } from "express";
import DbClient from "../prisma/DbClient";
import bcrypt from "bcryptjs";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ error: "Name, email, and password are required" });
    }

    const user = await DbClient.user.findUnique({
      where: { email },
    });

    if (user) {
      return res.status(409).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await DbClient.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res.status(200).json({ message: "Register successful" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
