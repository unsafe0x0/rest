import type { Request, Response } from "express";
import DbClient from "../prisma/DbClient";
import bcrypt from "bcryptjs";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { name, email, password } = req.body;

    const user = await DbClient.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedData = [];

    if (name) {
      updatedData.push({ name });
    }
    if (email) {
      updatedData.push({ email });
    }
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.push({ password: hashedPassword });
    }

    await DbClient.user.update({
      where: { id: userId },
      data: {
        ...updatedData,
      },
    });

    return res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
