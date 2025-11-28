import type { Request, Response } from "express";
import DbClient from "../prisma/DbClient";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const id = req.userId as string;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await DbClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
