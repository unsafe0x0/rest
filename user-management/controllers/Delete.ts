import type { Request, Response } from "express";
import DbClient from "../../prisma/DbClient";

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const id = req.userId as string;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await DbClient.user.delete({
      where: { id },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
