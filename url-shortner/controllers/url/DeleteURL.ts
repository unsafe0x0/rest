import type { Request, Response } from "express";
import DbClient from "../../prisma/DbClient";

export const deleteURL = async (req: Request, res: Response) => {
  try {
    const id = req.userId as string;

    if (!id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { shortCode } = req.params;
    if (!shortCode) {
      return res.status(400).json({ error: "shortCode is required" });
    }

    const urlEntry = await DbClient.url.findUnique({
      where: { short: shortCode },
    });

    if (!urlEntry) {
      return res.status(404).json({ error: "URL not found" });
    }

    if (urlEntry.userId !== id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    await DbClient.url.delete({
      where: { short: shortCode },
    });

    return res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
